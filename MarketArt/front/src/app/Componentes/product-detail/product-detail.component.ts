import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProductDetailService } from 'src/app/Servicios/ObtenerDetalleProductos/get-product-detail.service';
import { CarritoService } from 'src/app/Servicios/ProductosCarrito/carrito-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  producto: any = [];

  constructor(private actRouter: ActivatedRoute, private detailedProductService: GetProductDetailService, private router:Router, private carritoService:CarritoService) { }

  ngOnInit(): void {
    this.actRouter.params.subscribe(params => {
      let productCat: any = params['productCat'];
      let productId: any = params['productID'];

      this.loadProduct(productCat, productId);

    });
  }


  loadProduct(productCat: any, productId: any) {
    this.detailedProductService.getProductDetail(productCat, productId).subscribe(data => {
      this.producto = data;
    });
  }

  goBack(){
    this.router.navigate(['/home']);
  }

  botonMenos(id_producto: number) {

    let cantidadEl: any = document.getElementById("inputDetailCantidad" + id_producto);
    let cantidadVal: number = parseInt(cantidadEl.value);

    if (cantidadVal > 1) {
      cantidadEl.value = cantidadVal - 1;
    }
  }


  botonMas(id_producto: number) {

    let cantidadEl: any = document.getElementById("inputDetailCantidad" + id_producto);
    let cantidadVal: number = parseInt(cantidadEl.value);

    cantidadEl.value = cantidadVal + 1;
  }


  addCarrito(idProducto: string, nombreProducto: string, precioProducto: string, urlImagen: string){
    let cantidad: any = document.getElementById("inputDetailCantidad" + idProducto);

    const producto = {
      idProducto: parseInt(idProducto),
      nombre: nombreProducto,
      precio: precioProducto,
      cantidad: parseInt(cantidad.value),
      urlImagen: urlImagen
    };


    this.carritoService.setProductoCarrito(producto);

  }
}
