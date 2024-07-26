import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetOrderDetailService {

  constructor(private http: HttpClient) { }


  getOrders() {
    const urlPedido = 'http://localhost:8080/pedidos';
    const tokenSesion: any = localStorage.getItem("tokenSesion");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${tokenSesion}`
    });

    return this.http.get(urlPedido, { headers });
  }

  getDetailedOrder(idPedido: number) {
    const urlPedidoDetail = 'http://localhost:8080/detallePedido';

    const params = new HttpParams()
      .set('idPedido', idPedido);

    return this.http.get(urlPedidoDetail, { params });

  }
}
