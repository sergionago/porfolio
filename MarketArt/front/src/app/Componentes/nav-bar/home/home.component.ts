import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetProductsService } from 'src/app/Servicios/ObtenerProductos/get-products.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router, private getProducts:GetProductsService) { }

  goHome() {
    this.getProducts.setCategoryId(0);
    this.router.navigate(['/home']);
  }
}
