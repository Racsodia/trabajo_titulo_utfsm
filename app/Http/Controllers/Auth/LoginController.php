<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\View;
use Laravel\Passport\HasApiTokens;
use Cookie;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Redirect the user to the provider authentication page.
     *
     * @return Response
     */
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Obtain the user information from provider and log in the user.
     *
     * @return Response
     */
    public function handleProviderCallback($provider)
    {
        try {
            $user = Socialite::driver($provider)->stateless()->user();
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            abort(403, 'Unauthorized action.');
            return redirect()->to('/');
        }
        $attributes = [
            'provider'      =>  $provider,
            'provider_id'   =>  $user->getId(),
            'name'          =>  $user->getName(),
            'email'         =>  $user->getEmail(),
            'photo_uri'     =>  $user->getAvatar(),
        ];

        $user = User::where([['provider', $attributes['provider']], ['provider_id', $attributes['provider_id']]])->first();
        if (!$user)
            $user = User::create($attributes);
        else
            $user->update($attributes);

        foreach ($user->tokens as $token)
            $token->revoke();
        $this->guard()->login($user);
        $token = auth()->user()->createToken($provider)->accessToken;
        return View::make('home')->with('token', $token);
    }

    public function logout()
    {
        foreach (auth()->user()->tokens as $token)
            $token->revoke();
        auth()->logout();
        return redirect('/');
    }
}
