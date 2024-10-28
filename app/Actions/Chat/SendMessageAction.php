<?php

namespace App\Actions\Chat;

use App\Models\Messages;
use App\Models\User;

class SendMessageAction
{
    public function run($request, $userId) {
//        $user = User::findOrFail($userId);
        $message = Messages::create([
            'message' => $request->message,
            'user_id' => $userId,
        ]);
//        $message->message = $request['message'];
        return $message->save();
    }
}
