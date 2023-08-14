import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard {
    constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const token = localStorage.getItem('access_token');

        if (token) {
            // El usuario tiene un token válido, permite el acceso a la ruta
            return this.router.parseUrl('/punto-venta');
        } else {
            // No hay token válido, redirige a la página de inicio de sesión
            return true;
        }
    }
}