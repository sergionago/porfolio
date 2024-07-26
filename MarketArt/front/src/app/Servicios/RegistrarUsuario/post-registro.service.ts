import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostRegistroService {


  private resultadoRegistroSource = new Subject<object>();
  public resultadoRegistro$ = this.resultadoRegistroSource.asObservable();


  constructor(private http: HttpClient) { }


  setMensajeServidor(mensaje: object) {
    this.resultadoRegistroSource.next(mensaje);
  }


  registrarUsuario(formData: object) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post('http://localhost:8080/registro', formData, httpOptions).subscribe({
      next: (data) => {
        this.setMensajeServidor(data);

      },
      error: (error) => {
        this.setMensajeServidor(error.error['error']);
      }
    });
  }

}
