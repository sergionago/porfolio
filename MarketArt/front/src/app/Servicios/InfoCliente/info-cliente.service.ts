import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoClienteService {


  private urlBase: string = "http://localhost:8080";
  private infoUsuarioSource = new Subject<object>();
  public infoUsuario$ = this.infoUsuarioSource.asObservable();

  constructor(private http: HttpClient) { }



  getInfoUser(token: string) {
    const url = this.urlBase + '/areaCliente';
    this.http.post(url, { tokenUser: token }).subscribe(data => {
      this.infoUsuarioSource.next(data);
    });
  }




}
