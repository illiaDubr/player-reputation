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
        $this->line('🚀 Команда запущена!');
        $path = storage_path('app/' . $this->argument('file'));

        $spreadsheet = IOFactory::load($path);
        $sheetNames = $spreadsheet->getSheetNames();
        $this->line('📑 Найденные листы:');
        foreach ($sheetNames as $index => $name) {
            $this->line("  [{$index}] {$name}");
        }
        $sheet = $spreadsheet->getSheet(1); // 2-й лист

        $rows = $sheet->toArray(null, true, true, true);
        $this->line('📄 Строк в листе: ' . count($rows));

        if (empty($rows)) {
            $this->error('❌ Лист пуст!');
            return;
        }

        $headers = array_map('trim', $rows[0]);
        $this->line('🔍 Заголовки: ' . json_encode($headers));
        $records = array_slice($rows, 1);

        if (empty($records)) {
            $this->error('❌ Нет данных после заголовков!');
            return;
        }

        $this->line('🔍 Пример первой строки данных: ' . json_encode($records[0]));

        $total = count($records);
        $success = 0;
        $skipped = 0;
        $failed = 0;

        foreach ($records as $rowIndex => $row) {
            $assoc = [];
            foreach ($headers as $key => $header) {
                $assoc[$header] = $row[$key] ?? null;
            }

            if (empty($assoc['NickNames'])) {
                $this->warn("⏭ Строка ".($rowIndex + 2)." пропущена — отсутствует NickNames.");
                $skipped++;
                continue;
            }

            try {
                $player = Player::updateOrCreate(
                    ['email' => $assoc['Mail'] ?? null],
                    [
                        'player_id'     => Str::uuid()->toString(),
                        'last_name'     => $assoc['FullName'] ?? null,
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

                $this->line("✅ Добавлен: {$player->email} (ID: {$player->player_id})");
                $success++;
            } catch (\Throwable $e) {
                $this->error("❌ Ошибка на строке ".($rowIndex + 2).": " . $e->getMessage());
                $failed++;
            }
        }

        $this->newLine();
        $this->info("📊 Импорт завершён:");
        $this->info("   ✅ Успешно:  {$success}");
        $this->info("   ⏭ Пропущено: {$skipped}");
        $this->info("   ❌ Ошибок:    {$failed}");
        $this->info("   Всего строк: {$total}");
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
