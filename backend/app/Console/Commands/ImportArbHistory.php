<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ReputationRecord;
use App\Models\Player;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class ImportArbHistory extends Command
{
    protected $signature = 'import:arb-history {file}';
    protected $description = 'Import arb-history data from a NOSQL file into reputation_records table';

    public function handle()
    {
        $file = $this->argument('file');

        if (!File::exists($file)) {
            $this->error("File not found: $file");
            return;
        }

        $importedCount = 0;
        $skippedCount = 0;

        $this->info("Reading data from $file...");

        $lines = File::lines($file);

        foreach ($lines as $line) {
            $data = json_decode($line, true);

            if (!$data) {
                $this->warn("Skipping invalid line: $line");
                $skippedCount++;
                continue;
            }

            try {
                foreach ($data['case'] as $case) {
                    ReputationRecord::create([
                        'player_id' => Player::where('old_id', $data['id'] ?? null)->value('player_id'),
                        'backer_id' => null, // Заполните, если нужно связать с backers
                        'comment' => $case['descr'] ?? null,
                        'arbitrage_descr' => $case['arbitrage'] ?? null,
                        'amount' => $case['amount'] ?? null,
                        'source' => $data['author'] ?? null,
                    ]);
                }

                $importedCount++;
            } catch (\Exception $e) {
                Log::error('Error importing arb-history', ['error' => $e->getMessage(), 'data' => $data]);
                $skippedCount++;
            }
        }

        $this->info("$importedCount reputation record(s) imported successfully.");
        $this->info("$skippedCount record(s) skipped due to errors.");
    }
}
