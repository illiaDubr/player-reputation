<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use App\Models\Backer;

class ImportFundsData extends Command
{
    protected $signature = 'import:funds-data {file}';
    protected $description = 'Import funds data from a NOSQL file into backers table';

    public function handle()
    {
        $file = $this->argument('file');

        // Проверяем существование файла
        if (!file_exists($file)) {
            $this->error("File not found: $file");
            return 1;
        }

        // Считаем все непустые строки файла
        $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if (!$lines) {
            $this->error("Failed to read lines from $file.");
            return 1;
        }

        $importedCount = 0;
        $skippedCount = 0;

        $this->info("Reading data from $file...");

        // Проходимся по каждой строке
        foreach ($lines as $line) {
            $line = trim($line);
            if (!$line) {
                // На всякий случай ещё раз проверяем, что строка не пустая
                $this->warn("Skipping empty line.");
                $skippedCount++;
                continue;
            }

            // Пытаемся декодировать JSON
            $data = json_decode($line, true);

            // Если не удалось — json_last_error() вернёт код ошибки
            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->warn("Skipping invalid JSON line: $line");
                $skippedCount++;
                continue;
            }

            // Убедимся, что у нас есть поле 'id'
            if (empty($data['id'])) {
                $this->warn("Skipping line without 'id': $line");
                $skippedCount++;
                continue;
            }

            try {
                // Пишем в базу
                Backer::create([
                    'old_backer' => $data['id'], // Тот же самый ID из JSON
                    'name'       => $data['name'] ?? 'Unnamed Backer',
                    'user_id'    => $data['user_id'] ?? null,
                    'managers'   => json_encode($data['managers']   ?? []),
                    'users'      => json_encode($data['users']      ?? []),
                    'readonlys'  => json_encode($data['readonlys']  ?? []),
                    'email'      => $data['email'] ?? null,
                ]);

                $importedCount++;
            } catch (\Exception $e) {
                // Если словили любую ошибку (например, нарушение уникального индекса, SQL-ошибку и т. д.)
                Log::error('Error importing fund', [
                    'error' => $e->getMessage(),
                    'data'  => $data,
                ]);
                $skippedCount++;
            }
        }

        $this->info("$importedCount backer(s) imported successfully.");
        $this->info("$skippedCount backer(s) skipped due to errors.");

        return 0;
    }
}
