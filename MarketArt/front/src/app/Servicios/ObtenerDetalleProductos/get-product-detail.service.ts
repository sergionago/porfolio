import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetProductDetailService {

  constructor(private http: HttpClient) { }

  private urlBase = 'http://localhost:8080';

  getProductDetail(productCat: string, productId: string) {
    let urlProductDetail = this.urlBase + '/productDetail';

    const params = new HttpParams()
      .set('productCat', productCat)
      .set('productId', productId);

    return this.http.get(urlProductDetail, {params});

  }
}
