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

Проанализируй предоставленный JSON и преобразуй его в данные, которые можно вставить в таблицы `players` и `reputation_records` базы данных Laravel. Верни результат ТОЛЬКО в формате JSON следующего вида:

{
    "players": [...],
    "reputation_records": [...]
}

### Правила преобразования:

1. **Таблица `players`:**
   - `player_id`: Уникальный идентификатор из входного JSON (`id`).
   - `first_name`, `last_name`: Из поля `FIO`.
   - `email`, `phonenumber`: Из полей `mail`, `phone`.
   - Поля, связанные с румами (например, `Ggpokerok`, `Pokerstars_com`): Оставь `null`, если информация отсутствует.
   - Никнеймы (например, `nickPS`, `nickGG`): Если есть совпадения с указанными румами или никнеймами, заполни их.
   - Поля `skype`, `telegram`, `discord`: Заполни, если есть информация.
   - `kyc_status`: Установи в `true` или `false` в зависимости от данных.
   - `backer_tag`: Определи на основе поля `case`:
     - Если в `case` есть упоминания о споре, используй `arbitration`.
     - Если игрок покинул покер, используй `left poker`.
     - Если игрок выплачивает долг, используй `pays off debt`.
     - Если проблема закрыта, используй `closed issue`.
     -Если поле пустое no tag
   - Все даты (`created`, `updated`) преобразуй в формат `YYYY-MM-DD HH:MM:SS`.

2. **Таблица `reputation_records`:**
   - `player_id`: Ссылайся на `player_id` из таблицы `players`.
   - `comment`: Используй текст из `case.descr`.
   - `fund_name`: Заполни из поля `fundName`.
   - `amount`: Преобразуй в числовой формат (например, "2500$" -> 2500.00). Если значение отсутствует, установи `null`.
   - `source`: Если есть информация о внешнем источнике (например, ссылки), укажи её. Если нет, установи `null`.
   - `created_at`, `updated_at`: Преобразуй в формат `YYYY-MM-DD HH:MM:SS`.

3. Игнорируй данные, которые не соответствуют указанным таблицам или их структуре.

### Пример входного JSON:
{
    "FIO": [
        {
            "lastname": "Андрей",
            "firstname": "Гриневич"
        }
    ],
    "skype": [
        "live:hart.perlo.job"
    ],
    "case": [
        {
            "descr": "Чипдампинг. Проиграл все фишки игроку с ником 料理鼠王",
            "amount": "2500$"
        }
    ],
    "mail": [
        "hart.perlo.job@gmail.com"
    ],
    "phone": [
        "380999771176"
    ],
    "fundName": "Турист",
    "created": "2021-03-10T12:30:25.793Z",
    "updated": "2021-03-10T12:30:25.793Z",
    "id": "6048bbe1b2d91b89fa75fa7b"
}

### Пример ожидаемого результата:
{
    "players": [
        {
            "player_id": "6048bbe1b2d91b89fa75fa7b",
            "first_name": "Андрей",
            "last_name": "Гриневич",
            "email": "hart.perlo.job@gmail.com",
            "phonenumber": "380999771176",
            "Ggpokerok": null,
            "Pokerstars_com": null,
            "nickPS": null,
            "skype": "live:hart.perlo.job",
            "kyc_status": false,
            "backer_tag": "arbitration",
            "created_at": "2021-03-10 12:30:25",
            "updated_at": "2021-03-10 12:30:25"
        }
    ],
    "reputation_records": [
        {
            "player_id": "6048bbe1b2d91b89fa75fa7b",
            "comment": "Чипдампинг. Проиграл все фишки игроку с ником 料理鼠王",
            "fund_name": "Турист",
            "amount": 2500.00,
            "source": null,
            "created_at": "2021-03-10 12:30:25",
            "updated_at": "2021-03-10 12:30:25"
        }
    ]
}

Верни только JSON в указанном формате. Если данных недостаточно, верни:
{
    "players": [],
    "reputation_records": []
}


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
                        'content' => 'Ты помощник, который анализирует JSON и преобразует его в формат базы данных.',
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
