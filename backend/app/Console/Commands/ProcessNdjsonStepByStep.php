<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\JsonProcessingController;

class ProcessNdjsonStepByStep extends Command
{
    protected $signature = 'process:ndjson-step {file}';
    protected $description = 'Process NDJSON file line by line, sending each object to the existing controller';

    public function handle()
    {
        $filePath = base_path($this->argument('file'));

        if (!file_exists($filePath)) {
            $this->error("File {$filePath} not found.");
            return 1;
        }

        $handle = fopen($filePath, 'r');
        if (!$handle) {
            $this->error("Failed to open file {$filePath}.");
            return 1;
        }

        $controller = app(JsonProcessingController::class);
        $lineNumber = 0;

        while (($line = fgets($handle)) !== false) {
            $lineNumber++;
            $line = trim($line);

            if (empty($line)) continue;

            $data = json_decode($line, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->error("Line {$lineNumber}: Invalid JSON - " . json_last_error_msg());
                continue;
            }

            $this->info("Processing line {$lineNumber}");

            try {
                $request = new \Illuminate\Http\Request();
                $request->replace(['data' => $data]);

                $response = $controller->processJson($request);

                if ($response->getStatusCode() !== 200) {
                    $this->error("Line {$lineNumber}: Error - " . $response->getContent());
                } else {
                    $this->info("Line {$lineNumber} processed successfully.");
                }

            } catch (\Exception $e) {
                $this->error("Line {$lineNumber}: Exception - " . $e->getMessage());
                continue;
            }
        }

        fclose($handle);
        $this->info("NDJSON processing completed.");
        return 0;
    }
}