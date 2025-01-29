<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Player;
use App\Models\User;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class ImportPlayerData extends Command
{
    protected $signature = 'import:player-data {file}';
    protected $description = 'Import player data from a JSON file';

    public function handle()
    {
        $file = $this->argument('file');

        if (!File::exists($file)) {
            $this->error("File not found: $file");
            return;
        }

        $json = File::get($file);
        $data = json_decode($json, true);

        if (!$data || !is_array($data)) {
            $this->error("Invalid JSON format or data is not an array.");
            return;
        }

        $importedCount = 0;
        $skippedCount = 0;

        foreach ($data as $entry) {
            try {
                // Получение старого ID
                $oldId = $entry['id'] ?? null;

                if (!$oldId) {
                    $this->warn("Skipping entry due to missing old ID: " . json_encode($entry));
                    $skippedCount++;
                    continue;
                }

                // Явная проверка mail и google
                $email = null;
                if (!empty($entry['mail'][0])) {
                    $email = $entry['mail'][0];
                } elseif (!empty($entry['google'][0])) {
                    $email = $entry['google'][0];
                }

                // Если email отсутствует, создается игрок без пользователя
                $user = null;
                if ($email) {
                    // Проверяем существование пользователя с этим email
                    $user = User::where('email', $email)->first();

                    if (!$user) {
                        // Если пользователя нет, создаем нового
                        $user = User::create([
                            'name' => $entry['FIO'][0]['firstname'] ?? 'Default Name',
                            'email' => $email,
                            'password' => bcrypt('password'),
                        ]);
                    }
                } else {
                    // Если email отсутствует, создаем заглушку
                    $email = 'placeholder_' . uniqid() . '@example.com';
                }

                // Извлечение информации из case
                $descr = null;
                $amount = null;
                if (!empty($entry['case'][0])) {
                    $descr = $entry['case'][0]['descr'] ?? null;
                    $amount = $entry['case'][0]['amount'] ?? null;
                }

                // Проверяем существование записи в таблице players
                $existingPlayer = Player::where('old_id', $oldId)->first();

                if ($existingPlayer) {
                    $this->warn("Skipping player entry due to existing old_id: {$oldId}");
                    $skippedCount++;
                    continue;
                }

                // Создаем запись в таблице players
                Player::create([
                    'user_id' => $user?->id, // Если пользователь создан, устанавливаем его ID, иначе null
                    'old_id' => $oldId,
                    'first_name' => $entry['FIO'][0]['firstname'] ?? null,
                    'last_name' => $entry['FIO'][0]['lastname'] ?? null,
                    'middle_name' => $entry['FIO'][0]['middlename'] ?? null,
                    'email' => $email,
                    'phonenumber' => $entry['phone'][0] ?? null,
                    'nickPS' => $entry['nickname'][0]['value'] ?? null,
                    'discord' => $entry['skype'][0] ?? null,
                    'Skrill' => $entry['skrill'][0] ?? null,
                    'Neteller' => $entry['neteller'][0] ?? null,
                    'GipsyTeam' => $entry['gipsyteam'][0] ?? null,
                    'telegram' => null,
                    'descr' => $descr,
                    'amount' => $amount,
                    'fund_name' => $entry['fundName'] ?? null,
                    'kyc_status' => false,
                    'created_by' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $importedCount++;
            } catch (\Exception $e) {
                $this->warn("Failed to import entry: " . json_encode($entry));
                $this->warn("Error: " . $e->getMessage());
                Log::error('Import error', ['entry' => $entry, 'error' => $e->getMessage()]);
                $skippedCount++;
            }
        }

        $this->info("$importedCount player(s) imported successfully.");
        $this->info("$skippedCount player(s) skipped due to errors or missing data.");
    }
}
