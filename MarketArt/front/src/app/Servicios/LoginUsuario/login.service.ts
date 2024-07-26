import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public resultadoLoginSource = new Subject<object>();
  public resultadoLogin$: Observable<object> = this.resultadoLoginSource.asObservable();

  constructor(private http: HttpClient, private cookie:CookieService) { }


  setMensajeServidor(mensaje: object) {
    this.resultadoLoginSource.next(mensaje);
  }

  setUsuarioAutenticado(nombre: string) {
    this.cookie.set("nombreUsuario", nombre);
  }


  iniciarSesion(userData: object) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post("http://localhost:8080/login", userData, httpOptions).subscribe({
      next: (data: any) => {
        this.setMensajeServidor(data.mensaje);
        this.setUsuarioAutenticado(data.nombreUsuario);

        const token = data.tokenSesion;
        //sessionStorage.setItem('tokenSesion', token); //Para que el token se borre al cerrar la pestaña o el navegador
        localStorage.setItem('tokenSesion', token); //Para que el token persista aunque se cierre la ventana o el navegador
      },
      error: (error) => {
        this.setMensajeServidor(error.error['error']);
      }
    });
  }


}
