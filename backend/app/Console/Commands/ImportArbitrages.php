<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Player;
use App\Models\ReputationRecord;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Str;

class ImportPlayersAndReputation extends Command
{
    protected $signature = 'import:players {file}';
    protected $description = 'Импортирует игроков и репутации из Excel';

    public function handle()
    {
        $path = storage_path("app/" . $this->argument('file'));

        $rows = Excel::toArray([], $path);
        $data = $rows[0]; // первая таблица в файле

        $headers = $data[0];
        $records = array_slice($data, 1);

        foreach ($records as $row) {
            $assoc = array_combine($headers, $row);
            if (!$assoc) continue;

            // создаем player_id
            $playerId = Str::uuid()->toString();

            $player = Player::updateOrCreate(
                ['email' => $assoc['Mail'] ?? null],
                [
                    'player_id' => $playerId,
                    'last_name' => $assoc['FullName'] ?? null,
                    'skype' => $assoc['Skype'] ?? null,
                    'GipsyTeam' => $assoc['GipsyTeam'] ?? null,
                    'Pokerstars' => $assoc['PokerStars'] ?? null,
                    'PS' => $assoc['PokerStars'] ?? null,
                    'GG' => null,
                    'RedStar' => null,
                    'TigerGaming' => null,
                    'PartyPoker' => null,
                    '888poker' => null,
                    'WPNpoker' => null,
                    'Stretchpoker' => null,
                    'Coinpoker' => null,
                    'chikoPoker' => null,
                    'nickiPoker' => null,
                    'Skrill' => $assoc['Skrill'] ?? null,
                    'Neteller' => $assoc['Neteller'] ?? null,
                    'Luxon' => null,
                    'telegram' => null,
                    'discord' => null,
                    'email' => $assoc['Mail'] ?? null,
                    'phonenumber' => $assoc['GoogleAccount'] ?? null,
                    'backer_tag' => 'arbitrage',
                ]
            );

            // создаём репутационную запись
            ReputationRecord::create([
                'player_id' => $player->player_id,
                'comment' => $assoc['ArbitrageLink'] ?? null,
                'source' => "IntTable",
                'fund_name' => null,
                'damage' => null,
                'makeUp' => null,
                'old_player_id' => null,
                'old_backer_id' => null,
            ]);
        }

        $this->info('✅ Импорт завершен');
    }
}
