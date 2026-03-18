<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class BlockIpMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $ip = $request->ip();

        // Check if there's any blocked user with this IP
        $isBlocked = User::where('ip_address', $ip)
            ->where('is_blocked', true)
            ->exists();

        if ($isBlocked) {
            return abort(403, 'Your IP access has been restricted due to suspicious activity. Please contact support.');
        }

        return $next($request);
    }
}
