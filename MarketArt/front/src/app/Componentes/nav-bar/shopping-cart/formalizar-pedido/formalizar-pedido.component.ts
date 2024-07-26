import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from 'src/app/Servicios/RealizarPedido/purchase-order.service';
import { format } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formalizar-pedido',
  templateUrl: './formalizar-pedido.component.html',
  styleUrls: ['./formalizar-pedido.component.scss']
})
export class FormalizarPedidoComponent implements OnInit {

  private datosUsuario: any = {};

  public productosPedidoArray: any[] = [];

  public nombre: string = '';
  public primerAp: string = '';
  public segundoAp: string = '';
  public correo: string = '';
  public direccion: string = '';
  public telefono: string = '';

  public mensajeServidor: any = '';

  constructor(private purchaseOrder: PurchaseOrderService, private router: Router) { }

  ngOnInit(): void {

    this.obtenerProductosPedido();

    this.purchaseOrder.infoUsuario$.subscribe(datos => {
      this.datosUsuario = datos;

      for (let i = 0; i < this.datosUsuario.length; i++) {
        this.nombre = this.datosUsuario[0].nombre;
        this.primerAp = this.datosUsuario[0].primer_apellido;
        this.segundoAp = this.datosUsuario[0].segundo_apellido;
        this.correo = this.datosUsuario[0].correo;
        this.telefono = this.datosUsuario[0].telefono;
        this.direccion = this.datosUsuario[0].direccion;
      }

    });



  }


  prev(divPrev: string) {
    let divMostrar = document.getElementById(divPrev);
    let divOcultar = document.getElementsByClassName('pedidoDiv');

    for (let i = 0; i < divOcultar.length; i++) {
      divOcultar[i].classList.remove("active");
    }
    if (divMostrar) {
      divMostrar.classList.add("active");
    }
  }


  obtenerProductosPedido() {
    this.productosPedidoArray = this.purchaseOrder.productosPedido;
  }


  next(divNext: string) {
    let divMostrar = document.getElementById(divNext);
    let divOcultar = document.getElementsByClassName('pedidoDiv');

    for (let i = 0; i < divOcultar.length; i++) {
      divOcultar[i].classList.remove("active");
    }

    if (divMostrar) {
      divMostrar.classList.add("active");
    }
  }


  finalizar() {
    let tokenSesion = localStorage.getItem("tokenSesion");
    let fecha = new Date();
    let fechaFormateada = format(fecha, 'yyyy-MM-dd HH:mm:ss');

    const body = {
      tokenSesion: tokenSesion, //De aqui obtengo el id_cliente (para tabla pedidos)
      arrayPedidos: this.productosPedidoArray, //De aquí obtengo el id_producto y las cantidades (para tabla detalle_pedidos)
      fecha: fechaFormateada //Fecha (para tabla pedidos)
    }
    //El id_pedido de detalles_pedido deberé generarlo en el servidor con SET @id_pedido := LAST_INSERT_ID();

    this.purchaseOrder.finalizarPedido(body);
    this.purchaseOrder.mensajeServidor$.subscribe(mensaje => {
      this.mensajeServidor = mensaje;
      alert(this.mensajeServidor);
      this.router.navigate(['/home']);
    });

  }

}
