import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //creamos una constante privada 
  private _URL = 'http://localhost:4000/api/products';

  constructor(private _http:HttpClient) { }

  saveProduct(product:Product): Observable<Product>{
    return this._http.post<Product>(this._URL,product);
  }

  /* También se podría escribir sin <Product> en el post y en el Observable poniéndolo como <any>.
   Así:
    saveProduct(product:Product): Observable<any>{
     return this._http.post(this._URL,product);
   }
  */

}
