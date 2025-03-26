<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BackupController extends Controller
{
    /**
     * Создать и скачать бекап базы данных.
     */
    public function downloadBackup()
    {
        // Имя файла с бекапом
        $backupFile = 'backup'. '.sql';

        // Данные подключения из .env
        $db_host = env('DB_HOST');
        $db_database = env('DB_DATABASE');
        $db_username = env('DB_USERNAME');
        $db_password = env('DB_PASSWORD');

        // Путь для временного хранения
        $path = storage_path('app/' . $backupFile);

        // Выполняем команду mysqldump
        $command = "mysqldump -h {$db_host} -u {$db_username} -p\"{$db_password}\" {$db_database} > {$path}";

        $returnVar = NULL;
        $output  = NULL;
        exec($command, $output, $returnVar);

        if ($returnVar !== 0) {
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при создании бекапа',
            ], 500);
        }

        return response()->download($path)->deleteFileAfterSend(true);
    }

    /**
     * Восстановить базу данных из бекапа.
     */
    public function uploadBackup(Request $request)
    {
        $request->validate([
            'backup' => 'required|file|mimes:sql',
        ]);

        $backupFile = $request->file('backup');

        // Сохраняем файл временно
        $path = storage_path('app/' . $backupFile->getClientOriginalName());
        $backupFile->move(storage_path('app'), $backupFile->getClientOriginalName());

        // Данные подключения
        $db_host = env('DB_HOST');
        $db_database = env('DB_DATABASE');
        $db_username = env('DB_USERNAME');
        $db_password = env('DB_PASSWORD');

        // Выполняем команду mysql для восстановления
        $command = "mysql -h {$db_host} -u {$db_username} -p\"{$db_password}\" {$db_database} < {$path}";

        $returnVar = NULL;
        $output  = NULL;
        exec($command, $output, $returnVar);

        // Удаляем временный файл
        unlink($path);

        if ($returnVar !== 0) {
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при восстановлении бекапа',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'База успешно восстановлена из бекапа.',
        ]);
    }
}
