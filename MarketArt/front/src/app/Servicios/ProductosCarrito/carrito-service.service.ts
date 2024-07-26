import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private productoCarritoSource = new Subject<object>();
  public productoCarrito$ = this.productoCarritoSource.asObservable();

  constructor() { }


  setProductoCarrito(producto: object) {
    this.productoCarritoSource.next(producto);
  }

}
