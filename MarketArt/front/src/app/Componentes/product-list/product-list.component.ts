import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../../Servicios/ObtenerProductos/get-products.service';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/Servicios/ProductosCarrito/carrito-service.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private ProductService: GetProductsService, private router: Router, private carritoService: CarritoService) { }

  public productos: any = [];
  public id_categoria: number = 0;
  public nombreSubcat: string = '';

  loadProducts() {

    let h2: any = document.getElementById("oferh2");

    if (this.id_categoria === 0) {
      
      this.nombreSubcat='';

      if (h2) {
        h2.style.display = "block";
      }


      this.ProductService.getProducts("/productosOferta").subscribe(data => {
        this.productos = data;
      });
    } else {

      if (h2 !== null) {
        h2.style.display = "none";
      }

      this.ProductService.getProducts(`/productosNavBar?id_categoria=${this.id_categoria}`).subscribe(data => {
        this.productos = data;
      });
    }

  }

  ngOnInit(): void {
    this.loadProducts(); //Carga los productos al inciar, como el id está inicializado por defecto a 0, carga las ofertas

    this.ProductService.id_categoria$.subscribe(id => { // Se suscribe al subject observable id_categoria$ de productService, cuando este cambia su valor (cambia por efecto del metodo showSelectedProducts del componente nav-bar)...sigue en la siguiente línea...
      this.id_categoria = id; // adjudica ese valor al id_categoria de este componente 

      this.loadProducts(); // y ejecuta la función loadProducts
    });

    this.ProductService.nombreCategoria$.subscribe(nomCat => { //Se suscribe al nombre de la categoría para escribirlo en la vista cuando este cambie
      this.nombreSubcat = nomCat;
    });
  }

  goToDetail(productIDCat: string) {
    let splitParams = productIDCat.split('-');
    let productCat = splitParams[1].slice(3);
    let productId = splitParams[0].slice(4);

    this.router.navigate(['/productDetail', productCat, productId]);

  }

  addCarrito(idProducto: string, nombreProducto: string, precioProducto: string, urlImagen: string) {

    let cantidad: any = document.getElementById("inputListCantidad" + idProducto);

    let producto = {
      idProducto: parseInt(idProducto),
      nombre: nombreProducto,
      precio: precioProducto,
      cantidad: parseInt(cantidad.value),
      urlImagen: urlImagen
    };
    this.carritoService.setProductoCarrito(producto);
  }

  botonMenos(id_producto: number) {

    let cantidadEl: any = document.getElementById("inputListCantidad" + id_producto);
    let cantidadVal: number = parseInt(cantidadEl.value);

    if (cantidadVal > 1) {
      cantidadEl.value = cantidadVal - 1;
    }
  }


  botonMas(id_producto: number) {

    let cantidadEl: any = document.getElementById("inputListCantidad" + id_producto);
    let cantidadVal: number = parseInt(cantidadEl.value);

    cantidadEl.value = cantidadVal + 1;
  }
}
