<?php
namespace App\Http\Controllers;

use App\Actions\Chat\SendMessageAction;
use App\Events\MessageSent;
use App\Http\Requests\MessageFormRequest;
use App\Models\Messages;

class ChatController extends Controller
{
    public function index()
    {

    }

    public function messages()
    {
        return Messages::query()->with('user')->get();
    }

    public function send(MessageFormRequest $request, SendMessageAction $action)
    {
        $data = $request->all();
        $message = $action->run($request, $data['userId']);

        broadcast(new MessageSent($data['userId'], $message));

        return $message;
    }
}
