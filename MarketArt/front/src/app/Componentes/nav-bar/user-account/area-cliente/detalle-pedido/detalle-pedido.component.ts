import { Component, OnInit } from '@angular/core';
import { GetOrderDetailService } from 'src/app/Servicios/DetallePedido/get-order-detail.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent implements OnInit {

  private idPedido: number = 0;
  private pedidoObject: any = {};
  public pedidoArray: any[] = [];
  public urlImagen: string[] = [];
  public nombre: string[] = [];
  public cantidad: number[] = [];
  public precioUnitario: string[] = [];

  constructor(private detallePedido: GetOrderDetailService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      this.idPedido = params['idPedido'];

      this.obtenerDetallePedido();
    });

  }

  obtenerDetallePedido() {
    this.detallePedido.getDetailedOrder(this.idPedido).subscribe(data => {
      this.pedidoObject = data;

      for (let i = 0; i < this.pedidoObject.length; i++) {
        this.pedidoArray.push(this.pedidoObject[i]);
        this.nombre[i]=this.pedidoObject[i].nombre;
        this.cantidad[i]=this.pedidoObject[i].cantidad;
        this.precioUnitario[i]=this.pedidoObject[i].precio_unitario;
        this.urlImagen[i]=this.pedidoObject[i].url_imagen;
      }
    });
  }

}
