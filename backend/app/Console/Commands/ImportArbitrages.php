<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use App\Models\Player;
use App\Models\ReputationRecord;
use Carbon\Carbon;

class ImportArbitrages extends Command
{
    protected $signature = 'import:players-csv {file}';
    protected $description = 'Импортирует игроков и репутацию из CSV файла';

    public function handle()
    {
        $this->line('🚀 Команда запущена!');
        $path = storage_path('app/' . $this->argument('file'));

        if (!file_exists($path)) {
            $this->error("❌ Файл не найден: {$path}");
            return;
        }

        $handle = fopen($path, 'r');
        if (!$handle) {
            $this->error("❌ Не удалось открыть файл.");
            return;
        }

        $headers = fgetcsv($handle, 10000, ',');
        if (!$headers) {
            $this->error("❌ Не удалось прочитать заголовки.");
            fclose($handle);
            return;
        }

        $headers = array_map('trim', $headers);
        $this->line('🔍 Заголовки: ' . json_encode($headers));

        $total = 0;
        $success = 0;
        $skipped = 0;
        $failed = 0;

        while (($row = fgetcsv($handle, 10000, ',')) !== false) {
            $total++;
            $assoc = array_combine($headers, $row);

            try {
                $email = $assoc['Mail'] ?? null;



                $player = Player::where('email', $email)->first();

                if (!$player) {
                    // Новый игрок
                    $player = Player::create([
                        'player_id' => Str::uuid()->toString(),
                        'last_name' => $assoc['FullName'] ?? null,
                        'skype' => $assoc['Skype'] ?? null,
                        'GipsyTeam' => $assoc['GipsyTeam'] ?? null,
                        'Pokerstars' => $assoc['PokerStars'] ?? null,
                        'PS' => $assoc['PokerStars'] ?? null,
                        'phonenumber' => $assoc['GoogleAccount'] ?? null,
                        'email' => $email,
                        'backer_tag' => $assoc['TypeOfScum'] ?? null,
                    ]);
                } else {
                    // Обновление без изменения player_id
                    $player->update([
                        'last_name' => $assoc['FullName'] ?? null,
                        'skype' => $assoc['Skype'] ?? null,
                        'GipsyTeam' => $assoc['GipsyTeam'] ?? null,
                        'Pokerstars' => $assoc['PokerStars'] ?? null,
                        'PS' => $assoc['PokerStars'] ?? null,
                        'phonenumber' => $assoc['GoogleAccount'] ?? null,
                        'backer_tag' => $assoc['TypeOfScum'] ?? null,
                    ]);
                }

                ReputationRecord::create([
                    'player_id' => $player->player_id,
                    'comment' => $assoc['ArbitrageLink'] ?? null,
                    'source' => 'WorldTable',
                    'created_at_reputation' => $this->parseDate($assoc['DateAppear'] ?? null),
                ]);

                $this->line("✅ Добавлен: {$player->email} (ID: {$player->player_id})");
                $success++;
            } catch (\Throwable $e) {
                $this->error("❌ Ошибка на строке {$total}: " . $e->getMessage());
                $failed++;
            }
        }

        fclose($handle);

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
            return Carbon::parse($value)->format('Y-m-d');
        } catch (\Throwable $e) {
            return null;
        }
    }
}
