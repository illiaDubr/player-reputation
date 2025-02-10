<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;



class JsonProcessingController extends Controller
{

    /**
     * Handle JSON file upload and processing.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function processJson(Request $request)
    {
        // Проверка на наличие поля 'data'
        if (!$request->has('data')) {
            return response()->json(['error' => 'The data field is required.'], 400);
        }

        // Получение содержимого JSON из поля 'data'
        $jsonContent = $request->input('data');

        // Проверка на корректность формата JSON
        if (!is_array($jsonContent)) {
            $jsonContent = json_decode($jsonContent, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                \Log::error('Invalid JSON format: ' . json_last_error_msg());
                return response()->json(['error' => 'Invalid JSON format'], 400);
            }
        }

        try {
            $processedData = $this->processWithOpenAI($jsonContent);
        } catch (\Exception $e) {
            \Log::error('OpenAI API Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }

        DB::beginTransaction();
        try {
            $this->saveToDatabase($processedData);
            DB::commit();
            return response()->json(['message' => 'Data processed and saved successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Database Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    /**
     * Send data to OpenAI API for processing.
     *
     * @param array $data
     * @return array
     * @throws \Exception
     */
    private function processWithOpenAI(array $data): array
    {
        $content = <<<EOT
Проанализируй предоставленный JSON и преобразуй его в структуру для таблиц `players` и `reputation_records`.

## Формат ответа:
Верни **строго** JSON:
{
  "players": [...],
  "reputation_records": [...]
}

Если нет данных, верни пустые массивы:
{
  "players": [],
  "reputation_records": []
}

---

### 1. players
Верни массив объектов (каждый объект — одна запись) в ключе "players" со следующими полями:

- "player_id": (строка или null) — идентификатор игрока из поля `id`.
- "first_name": (строка или null) — из поля `FIO`. Если `FIO` — массив, брать первое значение `FIO[0].firstname`.
- "last_name": (строка или null) — из поля `FIO`. Если `FIO` — массив, брать первое значение `FIO[0].lastname`.
- "middle_name": (строка или null) — из поля `FIO`. Если `FIO` — массив, брать первое значение `FIO[0].middlename`.
- "email": (строка или null) — из поля `mail`. Если `mail` — массив, брать первый элемент.  
- "phonenumber": (строка или null) — из поля `phone`. Если `phone` — массив, брать первый элемент.
- "Ggpokerok", "Ggnetwork", "Pokerstars_com", "Pokerstars_es", "Winamax_fr", "Winamax_es", "PS", "GG", "RedStar", "TigerGaming", "PartyPoker", "Pokerstars", "888poker", "WPNpoker", "Stretchpoker", "Coinpoker", "chikoPoker", "nickiPoker", "Skrill", "Neteller", "GipsyTeam", "Luxon":
  - (строка или null) — если в исходном JSON есть соответствующая информация (например, ник или учётная запись). Если она приходит массивом — возьми первый элемент. Если данных нет — null.
- "telegram": (строка или null) — аналогично выше, возьми первый элемент, если это массив.
- "discord": (строка или null) — аналогично, если массив — берем первый элемент.
- "skype": (строка или null) — аналогично, берем первый элемент.
- "kyc_status": (булево) — всегда `false`.
- "kyc_verified_at": (null) — нет данных, так что null.
- "backer_tag": (строка) — определяем по правилам:
  1. **arbitrage** — если есть финансовая претензия (долги, невыплаты) в `case.descr`.
  2. **MultiArbitrage** — если есть более одной записи в `case` с финансовыми претензиями.
  3. **ProblematicPlayer** — если нет претензий по финансам, но есть нарушения: негатив, систематическое нарушение условий и т. п.
  4. **PlayerOnPause** — если нет претензий по финансам, но игрок взял паузу, временно прекратил игру и обещал вернуться.
  5. **no tag** — если ни один пункт выше не подходит.
- "created_at": (строка в формате "YYYY-MM-DD HH:MM:SS") — из `created`. Если поле — в формате ISO 8601 (например, `"2021-03-10T12:30:25.793Z"`), преобразовать в `"2021-03-10 12:30:25"`.
- "updated_at": (строка в формате "YYYY-MM-DD HH:MM:SS") — из `updated`.

### 2. reputation_records
Верни массив объектов (каждый объект — одна запись) в ключе "reputation_records" со следующими полями:

- "player_id": (строка или null) — та же, что в `players.player_id`.
- "comment": (строка или null) — текст из `case.descr`.
- "fund_name": (строка или null) — значение из `fundName`.
- "damage": (число или null) — если в `case.amount` есть сумма, например `"2500$"`, извлеки число (2500.00). Иначе null.
- "makeUp": (строка или null) — если есть такое поле во входном JSON. Если нет — null.
- "source": (строка или null) — если есть внешняя ссылка или источник. Если в JSON это массив, возьми первый элемент. Иначе null.
- "created_at": (строка в формате "YYYY-MM-DD HH:MM:SS") — то же правило, что и для `players`.
- "updated_at": (строка в формате "YYYY-MM-DD HH:MM:SS").

### 3. Если какие-то поля приходят массивом
- Бери **только первый элемент** массива и превращай его в строку.
- Если массив пустой, ставь `null`.

### 4. Если данных нет или они не подходят под формат
- Ставь `null` или игнорируй. Если нет подходящих объектов для "players" или "reputation_records", верни пустые массивы.

### Итог
- Верни результат **строго** в формате JSON, без описаний, комментариев и дополнительного текста.

---

#### Пример входных данных
```json
{
  "FIO": [
    {
      "lastname": "Петров",
      "firstname": "Игорь",
      "middlename": "Сергеевич"
    }
  ],
  "mail": ["petrov.igor@example.com"],
  "phone": ["79258352805"],
  "skype": ["live:afce474ed021940b", "live:someExtraSkype"],
  "case": [
    { "descr": "Игрок взял паузу. Обещал вернуться через 3 месяца.", "amount": "1000$" }
  ],
  "fundName": "ФондX",
  "created": "2021-03-10T12:30:25.793Z",
  "updated": "2021-03-10T12:30:25.793Z",
  "id": "6048bbe1b2d91b89fa75fa7b"
}
Сформируй JSON:

{
  "players": [
    {
      "player_id": "6048bbe1b2d91b89fa75fa7b",
      "first_name": "Игорь",
      "last_name": "Петров",
      "middle_name": "Сергеевич",
      "email": "petrov.igor@example.com",
      "phonenumber": "79258352805",
      "Ggpokerok": null,
      "Ggnetwork": null,
      "Pokerstars_com": null,
      "Pokerstars_es": null,
      "Winamax_fr": null,
      "Winamax_es": null,
      "PS": null,
      "GG": null,
      "RedStar": null,
      "TigerGaming": null,
      "PartyPoker": null,
      "Pokerstars": null,
      "888poker": null,
      "WPNpoker": null,
      "Stretchpoker": null,
      "Coinpoker": null,
      "chikoPoker": null,
      "nickiPoker": null,
      "Skrill": null,
      "Neteller": null,
      "GipsyTeam": null,
      "Luxon": null,
      "telegram": null,
      "discord": null,
      "skype": "live:afce474ed021940b", 
      "kyc_status": false,
      "kyc_verified_at": null,
      "backer_tag": "PlayerOnPause",
      "created_at": "2021-03-10 12:30:25",
      "updated_at": "2021-03-10 12:30:25"
    }
  ],
  "reputation_records": [
    {
      "player_id": "6048bbe1b2d91b89fa75fa7b",
      "comment": "Игрок взял паузу. Обещал вернуться через 3 месяца.",
      "fund_name": "ФондX",
      "damage": 1000.00,
      "makeUp": null,
      "source": null,
      "created_at": "2021-03-10 12:30:25",
      "updated_at": "2021-03-10 12:30:25"
    }
  ]
}
**Выполни данные правила и выдай итог строго в виде JSON (без дополнительного текста или пояснений).** 


EOT;
        $inputJson = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        // Соединяем текст запроса с данными JSON
        $content .= "\n\n" . $inputJson;

        $response = Http::withToken(env('OPENAI_API_KEY'))
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'ТТы помощник, который анализирует JSON и превращает его в структуру, пригодную для записи в таблицы базы данных. В конечном ответе нельзя возвращать поля с массивами вместо строк — если поле в исходном JSON приходит как массив, нужно взять только первый элемент (либо объединить в строку), а если пусто, вернуть null. Выдай результат строго в формате JSON.".
',
                    ],
                    [
                        'role' => 'user',
                        'content' => $content,
                    ]
                ],
                'max_tokens' => 2000,
            ]);
        if ($response->failed()) {
            throw new \Exception('OpenAI API request failed: ' . $response->body());
        }

        $result = $response->json();

        if (!isset($result['choices'][0]['message']['content'])) {
            throw new \Exception('Unexpected response format: ' . json_encode($result));
        }

        $cleanContent = str_replace("'", '"', $result['choices'][0]['message']['content']);
        $parsedContent = json_decode($cleanContent, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception('Failed to decode JSON from OpenAI response: ' . $result['choices'][0]['message']['content']);
        }

        // Преобразуем даты в стандартный MySQL формат
        array_walk_recursive($parsedContent, function (&$value, $key) {
            if (in_array($key, ['created_at', 'updated_at', 'created', 'updated']) && preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/', $value)) {
                $value = date('Y-m-d H:i:s', strtotime($value));
            }
        });

        return $parsedContent;
    }



    /**
     * Map JSON data to players table structure.
     *
     * @param array $data
     * @return array
     */
    private function mapJsonToPlayers(array $data): array
    {
        return [
            'player_id' => $data['id'] ?? null,
            'first_name' => $data['FIO']['firstname'] ?? null,
            'last_name' => $data['FIO']['lastname'] ?? null,
            'middle_name' => $data['FIO']['middlename'] ?? null,
            'email' => $data['mail'][0] ?? null,
            'phonenumber' => $data['phone'][0] ?? null,
            'Ggpokerok' => $data['nickGG'] ?? null,
            'Pokerstars_com' => $data['nickPokerstars'] ?? null,
            'Neteller' => $data['neteller'][0] ?? null,
            'Skrill' => $data['skrill'][0] ?? null,
            'GipsyTeam' => $data['gipsyteam'][0] ?? null,
            'telegram' => $data['telegram'] ?? null,
            'discord' => $data['discord'] ?? null,
            'skype' => $data['skype'][0] ?? null,
            'backer_tag' => $this->determineBackerTag($data['case']),
            'created_at' => isset($data['created']) ? date('Y-m-d H:i:s', strtotime($data['created'])) : now(),
            'updated_at' => isset($data['updated']) ? date('Y-m-d H:i:s', strtotime($data['updated'])) : now(),
            'kyc_status' => false,
            'kyc_verified_at' => null,
        ];
    }

    /**
     * Determine the backer tag for the player based on cases.
     *
     * @param array|null $cases
     * @return string
     */
    private function determineBackerTag(?array $cases): string
    {
        if (empty($cases)) {
            return 'no tag';
        }

        foreach ($cases as $case) {
            if (strpos(strtolower($case['descr'] ?? ''), 'arbitration') !== false) {
                return 'arbitration';
            }
            if (strpos(strtolower($case['descr'] ?? ''), 'debt') !== false) {
                return 'pays off debt';
            }
            if (strpos(strtolower($case['descr'] ?? ''), 'left poker') !== false) {
                return 'left poker';
            }
        }

        return 'closed issue';
    }


    /**
     * Map JSON data to reputation_records table structure.
     *
     * @param array $data
     * @return array
     */
    private function mapJsonToReputationRecords(array $data): array
    {
        $reputationRecords = [];

        foreach ($data['case'] ?? [] as $case) {
            $reputationRecords[] = [
                'player_id' => $data['id'] ?? null, // Должно совпадать с player_id из таблицы players
                'comment' => $case['descr'] ?? null,
                'fund_name' => $data['fundName'] ?? null,
                'amount' => isset($case['amount']) ? (float)preg_replace('/[^0-9.]/', '', $case['amount']) : null,
                'source' => $data['gipsyteam'][0] ?? null,
                'created_at' => isset($data['created']) ? date('Y-m-d H:i:s', strtotime($data['created'])) : now(),
                'updated_at' => isset($data['updated']) ? date('Y-m-d H:i:s', strtotime($data['updated'])) : now(),
            ];
        }

        return $reputationRecords;
    }



    /**
     * Save processed data to the database.
     *
     * @param array $data
     * @return void
     */
    private function saveToDatabase(array $data)
    {
        foreach ($data as $table => $records) {
            if (!is_array($records)) {
                throw new \Exception("Invalid records for table: {$table}");
            }

            foreach ($records as $record) {
                if ($table === 'players') {
                    // Сохраняем данные в таблицу players
                    DB::table('players')->updateOrInsert(
                        ['player_id' => $record['player_id'] ?? null],
                        $record
                    );
                } elseif ($table === 'reputation_records') {
                    // Проверяем структуру данных перед вставкой
                    try {
                        DB::table('reputation_records')->insert($record);
                    } catch (\Exception $e) {
                        \Log::error('Error inserting into reputation_records: ' . $e->getMessage());
                        \Log::error('Record: ', $record);
                    }
                } else {
                    // Сохраняем данные в другие таблицы
                    if (isset($record['id'])) {
                        DB::table($table)->updateOrInsert(
                            ['id' => $record['id']],
                            $record
                        );
                    } else {
                        DB::table($table)->insert($record);
                    }
                }
            }
        }
    }


}
