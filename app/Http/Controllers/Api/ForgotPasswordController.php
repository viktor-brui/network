<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $response = $this->broker()->sendResetLink($request->only('email'));
        return $response == Password::RESET_LINK_SENT
            ? $this->sendResetLinkResponse($request, $response)
            : $this->sendResetLinkFailedResponse($request, $response);
    }

    public function broker() {
        return Password::broker();
    }

    protected function sendResetLinkResponse(Request $request, $response) {
        return response()->json(['message' => 'Email sent', 'response' => $response], 200);
    }
    protected function sendResetLinkFailedResponse(Request $request, $response) {
        return response()->json(['error' => 'Not such a user', 'response' => $response], 500);
    }
}
