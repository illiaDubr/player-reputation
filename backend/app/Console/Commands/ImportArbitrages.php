<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Maatwebsite\Excel\Facades\Excel;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Illuminate\Support\Str;
use App\Models\Player;
use App\Models\ReputationRecord;

class ImportPlayersAndReputation extends Command
{
    protected $signature = 'import:players {file}';
    protected $description = 'Импортирует игроков и их репутацию из Excel-файла (4-й лист)';

    public function handle()
    {
        $file = storage_path("app/" . $this->argument('file'));

        // Получаем 4-й лист
        $rows = Excel::toArray([], $file);
        $data = $rows[3] ?? [];

        if (empty($data)) {
            $this->error('❌ Четвёртый лист пуст или не найден.');
            return;
        }

        $headers = array_map('trim', $data[0]);
        $records = array_slice($data, 1);
        $count = 0;

        foreach ($records as $row) {
            $assoc = array_combine($headers, $row);
            if (!$assoc || empty($assoc['NickNames'])) continue;

            $email = $assoc['Mail'] ?? null;

            // Игрок
            $player = Player::updateOrCreate(
                ['email' => $email],
                [
                    'player_id'     => Str::uuid()->toString(),
                    'first_name'    => $assoc['FullName'] ?? null,
                    'skype'         => $assoc['Skype'] ?? null,
                    'GipsyTeam'     => $assoc['GipsyTeam'] ?? null,
                    'Pokerstars'    => $assoc['PokerStars'] ?? null,
                    'PS'            => $assoc['PokerStars'] ?? null,
                    'phonenumber'   => $assoc['GoogleAccount'] ?? null,
                    'email'         => $email,
                    'backer_tag'    => $assoc['TypeOfScum'] ?? null,
                ]
            );

            // Репутация
            ReputationRecord::create([
                'player_id'             => $player->player_id,
                'comment'               => $assoc['ArbitrageLink'] ?? null,
                'source'                => 'WorldTable',
                'created_at_reputation' => $this->parseDate($assoc['DateAppear'] ?? null),
            ]);

            $count++;
        }

        $this->info("✅ Импорт завершен. Добавлено {$count} записей.");
    }

    protected function parseDate($value): ?string
    {
        if (!$value) return null;

        try {
            if (is_numeric($value)) {
                return Date::excelToDateTimeObject($value)->format('Y-m-d');
            }
            return \Carbon\Carbon::parse($value)->format('Y-m-d');
        } catch (\Exception $e) {
            return null;
        }
    }
}
