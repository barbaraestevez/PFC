import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _URL = 'http://localhost:4000/api/products/';

  constructor(private _http: HttpClient) { }

  saveProduct(product: Product): Observable<Product> {
    return this._http.post<Product>(this._URL, product); //, this.addHeader(credentials)
  }

  getAllProducts(): Observable<any> {
    return this._http.get(this._URL);
  }

  updateOneProduct(_id:any, product: Product): Observable<any> { //!
    return this._http.put(this._URL + _id, product);
  }
  deleteProduct(_id:any): Observable<any> { //!
    return this._http.delete(this._URL + _id);
  }

  /*addHeader(credentials:string) {
    return {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-type': 'application/json'
      }}
},withCredentials: true*/
}
