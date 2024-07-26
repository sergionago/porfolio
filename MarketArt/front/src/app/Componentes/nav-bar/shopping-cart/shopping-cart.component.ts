import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/Servicios/ProductosCarrito/carrito-service.service';
import { Router } from '@angular/router';
import { PurchaseOrderService } from 'src/app/Servicios/RealizarPedido/purchase-order.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {


  public productosCarrito: any = [];

  constructor(private carritoService: CarritoService, private router: Router, private purchaseOrder: PurchaseOrderService) { }


  ngOnInit(): void {
    this.carritoService.productoCarrito$.subscribe(producto => {
      this.setCarrito(producto);
    });
  }



  setCarrito(producto: any) {
    let encontrado = false;

    for (let i = 0; i < this.productosCarrito.length; i++) {
      if (parseInt(producto.idProducto) === parseInt(this.productosCarrito[i].idProducto)) {
        this.productosCarrito[i].cantidad += producto.cantidad;
        encontrado = true;
        break;
      }
    }

    if (!encontrado) {
      this.productosCarrito.push(producto);
    }

  }

  botonMenos(id_producto: number) {

    let cantidadEl: any = document.getElementById("inputCantidad" + id_producto);
    let cantidadVal: number = parseInt(cantidadEl.value);

    if (cantidadVal > 1) {
      cantidadEl.value = cantidadVal - 1;
    } else if (cantidadVal = 1) {
      cantidadEl.value = 0;
      const indiceEliminar = this.productosCarrito.findIndex((elemento: any) => {
        return elemento.idProducto === id_producto;
      });
      setTimeout(() => {
        this.productosCarrito.splice(indiceEliminar, 1);
      }, 500);

    }

  }

  botonMas(id_producto: number) {

    let cantidadEl: any = document.getElementById("inputCantidad" + id_producto);
    let cantidadVal: number = parseInt(cantidadEl.value);

    cantidadEl.value = cantidadVal + 1;
  }


  showDivCesta() {
    let divCesta: any = document.getElementById("listaCarrito");

    if (divCesta.classList.contains("active")) {
      divCesta.classList.remove("active");
    } else {
      divCesta.classList.add("active");
    }
  }

  hideDivCesta() {
    let divCesta: any = document.getElementById("listaCarrito");
    divCesta.classList.remove("active");
  }


  hacerPedido() {
    const tokenSesion = localStorage.getItem("tokenSesion");
    this.purchaseOrder.setDatosUsuario(tokenSesion);
    this.purchaseOrder.setProductosPedido(this.productosCarrito);
    this.router.navigate(['/realizarPedido']);
  }

}
