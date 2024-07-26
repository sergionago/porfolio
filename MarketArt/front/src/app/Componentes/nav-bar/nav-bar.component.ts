import { Component } from '@angular/core';
import { GetProductsService } from '../../Servicios/ObtenerProductos/get-products.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private ProductService: GetProductsService) { }

  public categorias: any = [
    {
      id: 1,
      nombre: "Joyería",
      subcategorias: [
        { id: 2, nombre: "Colgantes" },
        { id: 3, nombre: "Pulseras" },
        { id: 4, nombre: "Anillos" }
      ]
    },

    {
      id: 5,
      nombre: "Accesorios",
      subcategorias: [
        { id: 6, nombre: "Bolsos" },
        { id: 7, nombre: "Guantes" },
        { id: 8, nombre: "Sombreros" }
      ]
    },

    {
      id: 9,
      nombre: "Artículos de papelería",
      subcategorias: [
        { id: 10, nombre: "Cuadernos" },
        { id: 11, nombre: "Álbumes de fotos" },
        { id: 12, nombre: "Calendarios" }
      ]
    },

    {
      id: 13,
      nombre: "Decoración del Hogar",
      subcategorias: [
        { id: 14, nombre: "Cojines" },
        { id: 15, nombre: "Mantas" },
        { id: 16, nombre: "Cuadros" },
      ]
    },

    {
      id: 17,
      nombre: "Cerámica y Alfarería",
      subcategorias: [
        { id: 18, nombre: "Platos y cuencos" },
        { id: 19, nombre: "Tazas y vasos" },
        { id: 20, nombre: "Figuras" },
      ]
    },

    {
      id: 21,
      nombre: "Jardinería",
      subcategorias: [
        { id: 22, nombre: "Macetas" },
        { id: 23, nombre: "Herramientas" }
      ]
    }

  ];

  

  showSubMenu(numeroMenu: number) {
    let ulOcultar: NodeListOf<Element> = document.querySelectorAll('div[id^="hijos"]');
    let ulMostrar: HTMLElement | null = document.getElementById("hijos" + numeroMenu);

    if (ulMostrar) {
      let isAactive: boolean = ulMostrar.classList.contains("active");

      for (let i: number = 0; i < ulOcultar.length; i++) {
        ulOcultar[i].classList.remove("active");
      }

      if (!isAactive) {
        ulMostrar.classList.add("active");
      }
    }
  }

  showSelectedProducts(id_categoria: number, nombreCategoria:string) { //Actualizo el id de productService
    this.ProductService.setCategoryId(id_categoria);
    this.ProductService.setNombreCategoria(nombreCategoria);
  }

}