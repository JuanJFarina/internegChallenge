import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const token = localStorage.getItem('access_token');
        const token_exp = localStorage.getItem('token_expiration');
        if (token && token_exp! > (new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd HH:mm:ss'))!) {
            return true;
        } else {
            return this.router.parseUrl('/login');
        }
    }
}