import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  onSubmit() {
    // Realizar la solicitud POST para obtener el token de acceso
    const apiUrl = 'URL_DE_LA_API/login'; // Reemplaza con la URL correcta de la API
    const credentials = { username: this.username, password: this.password };

    this.http.post(apiUrl, credentials).subscribe(
      (response: any) => {
        // Manejar la respuesta exitosa
        const token = response.token;
        // Almacena el token en el localstorage
        localStorage.setItem('access_token', token);
        // Redirigir a la página deseada después del login exitoso
        // Ejemplo: this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error en el login:', error);
      }
    );
  }
}