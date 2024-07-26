import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  private infoUsuarioSource = new Subject<object>();
  public infoUsuario$ = this.infoUsuarioSource.asObservable();

  private mensajeServidorSource=new Subject<object>();
  public mensajeServidor$=this.mensajeServidorSource.asObservable();

  public productosPedido: any = {};

  constructor(private http: HttpClient) { }


  setProductosPedido(productos: any) {
    this.productosPedido = productos;
  }


  setDatosUsuario(tokenSesion: any) {
    const urlPedido = 'http://localhost:8080/datosUsuarioPedido';

    const params = new HttpParams()
      .set('tokenSesion', tokenSesion);

    this.http.get(urlPedido, { params }).subscribe(data => {
      this.infoUsuarioSource.next(data);
    });

  }


  finalizarPedido(body:object){

    const urlFinPedido='http://localhost:8080/realizarPedido';
    const bodyJSON=JSON.stringify(body);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(urlFinPedido, bodyJSON, {headers}).subscribe(data=>{
      this.mensajeServidorSource.next(data);
    });
  }

}
