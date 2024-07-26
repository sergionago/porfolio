import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class GetProductsService {

  constructor(private http: HttpClient) { }

  private urlBase: string = 'http://localhost:8080';

  private idCategoriaSource=new Subject<number>();
  public id_categoria$=this.idCategoriaSource.asObservable();

  private nombreCategoriaSource=new Subject<string>();
  public nombreCategoria$=this.nombreCategoriaSource.asObservable();

  setCategoryId(id_cat:number){
    this.idCategoriaSource.next(id_cat);
  }

  setNombreCategoria(nom_cat:string){
    this.nombreCategoriaSource.next(nom_cat);
  }

  getProducts(urlFin:string):Observable<any> {
    let url = this.urlBase+urlFin;
    return this.http.get(url); //Devuelve un observable que representa la respuesta de la solicitud get con los productos a mostrar
  }

}
