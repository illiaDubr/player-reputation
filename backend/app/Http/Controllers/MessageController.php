<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'author'   => 'required|string|max:255',
            'content'  => 'required|string',
            'sent_at'  => 'required|date',
        ]);

        Message::create($validated);

        return response()->json(['status' => 'ok']);
    }
}
