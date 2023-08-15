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

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  onSubmit() {
    // Realizar la solicitud POST para obtener el token de acceso
    const apiUrl = 'https://interneg.ddns.net/api-challenge/login';
    const credentials = { username: this.username, password: this.password };

    this.http.post(apiUrl, credentials).subscribe({
      next: (response: any) => {
        // Manejar la respuesta exitosa
        const token = response.ATO;
        // Almacena el token en el localstorage
        localStorage.setItem('access_token', token);
        // Redirigir a la página deseada después del login exitoso
        this.router.navigate(['/ventas']);
      },
      error: (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error en el login:', error);
      }
    });
  }
}