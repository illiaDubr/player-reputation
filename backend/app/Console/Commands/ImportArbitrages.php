<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Illuminate\Support\Str;
use App\Models\Player;
use App\Models\ReputationRecord;

class ImportArbitrages extends Command
{
    protected $signature = 'import:players-raw {file}';
    protected $description = 'Импортирует игроков и репутацию из Excel без Laravel Excel';

    public function handle()
    {
        $path = storage_path('app/' . $this->argument('file'));

        $spreadsheet = IOFactory::load($path);
        $sheet = $spreadsheet->getSheet(1); // 4-й лист (индексация с нуля)
        $rows = $sheet->toArray(null, true, true, true);

        $headers = array_map('trim', $rows[1]); // строка заголовков
        $records = array_slice($rows, 2); // данные с 3-й строки

        $count = 0;

        foreach ($records as $row) {
            $assoc = [];
            foreach ($headers as $key => $header) {
                $assoc[$header] = $row[$key] ?? null;
            }

            if (empty($assoc['NickNames'])) continue;

            $player = Player::updateOrCreate(
                ['email' => $assoc['Mail'] ?? null],
                [
                    'player_id'     => Str::uuid()->toString(),
                    'last_name'    => $assoc['FullName'] ?? null,
                    'skype'         => $assoc['Skype'] ?? null,
                    'GipsyTeam'     => $assoc['GipsyTeam'] ?? null,
                    'Pokerstars'    => $assoc['PokerStars'] ?? null,
                    'PS'            => $assoc['PokerStars'] ?? null,
                    'phonenumber'   => $assoc['GoogleAccount'] ?? null,
                    'email'         => $assoc['Mail'] ?? null,
                    'backer_tag'    => $assoc['TypeOfScum'] ?? null,
                ]
            );

            ReputationRecord::create([
                'player_id'             => $player->player_id,
                'comment'               => $assoc['ArbitrageLink'] ?? null,
                'source'                => 'WorldTable',
                'created_at_reputation' => $this->parseDate($assoc['DateAppear'] ?? null),
            ]);

            $count++;
        }

        $this->info("✅ Импорт завершён. Обработано: {$count} строк.");
    }

    protected function parseDate($value): ?string
    {
        if (!$value) return null;

        try {
            if (is_numeric($value)) {
                return Date::excelToDateTimeObject($value)->format('Y-m-d');
            }
            return \Carbon\Carbon::parse($value)->format('Y-m-d');
        } catch (\Throwable $e) {
            return null;
        }
    }
}