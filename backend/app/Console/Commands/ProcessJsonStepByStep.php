<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\JsonProcessingController;

class ProcessJsonStepByStep extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'process:json-step {file}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process a JSON file step by step, sending each object to the existing controller with a delay';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $filePath = base_path($this->argument('file'));

        if (!file_exists($filePath)) {
            $this->error("File {$filePath} not found.");
            return 1;
        }

        // Read the JSON file
        $jsonData = json_decode(file_get_contents($filePath), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->error('Invalid JSON file: ' . json_last_error_msg());
            return 1;
        }

        $controller = app(JsonProcessingController::class);

        foreach ($jsonData as $index => $object) {
            $this->info("Processing object " . ($index + 1) . " of " . count($jsonData));

            try {
                // Create a simulated request
                $request = new \Illuminate\Http\Request();
                $request->replace(['data' => $object]);

                // Call the existing controller method
                $response = $controller->processJson($request);

                // Check response status
                if ($response->getStatusCode() !== 200) {
                    $this->error("Error processing object " . ($index + 1) . ": " . $response->getContent());
                } else {
                    $this->info("Object " . ($index + 1) . " processed successfully.");
                }

                // Add delay between requests
                $this->info("Waiting 20 seconds before the next request...");
                sleep(20);

            } catch (\Exception $e) {
                $this->error("Error processing object " . ($index + 1) . ": " . $e->getMessage());
                continue;
            }
        }

        $this->info("Processing completed.");
        return 0;
    }
}
