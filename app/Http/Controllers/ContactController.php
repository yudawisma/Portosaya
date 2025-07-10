<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'name' => 'required|max:100',
            'email' => 'required|email',
            'message' => 'required|max:1000',
        ]);

        // Format pesan untuk WhatsApp
        $text = "Halo, saya {$validated['name']} (%0AEmail: {$validated['email']}) ingin menyampaikan:%0A{$validated['message']}";

        // Ganti dengan nomor WhatsApp kamu (format internasional TANPA +)
        $whatsappNumber = '6281326360206';

        // Redirect ke link WhatsApp
        return redirect()->away("https://wa.me/{$whatsappNumber}?text={$text}");
    }
}
