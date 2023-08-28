import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginWrong: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  onSubmit() {
    const apiUrl = 'https://interneg.ddns.net/api-challenge/login';
    const credentials = { username: this.username, password: this.password };

    this.http.post(apiUrl, credentials).subscribe({
      next: (response: any) => {
        const token = response.ATO;
        const token_exp = response.ATO_exp;
        localStorage.setItem('access_token', token);
        localStorage.setItem('token_expiration', token_exp);
        this.router.navigate(['/in/ventas']);
      },
      error: (error) => {
        this.loginWrong = true;
        console.error('Error en el login:', error);
      }
    });
  }
}