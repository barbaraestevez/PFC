// Importa módulos y clases necesarios de Angular y otras dependencias
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';


// Decorador Injectable indica que este servicio puede ser inyectado en otros componentes o servicios
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // URL base para las solicitudes HTTP al backend de la API de productos
  private _URL = 'http://localhost:4000/api/products/';

  // Constructor que recibe una instancia de HttpClient mediante la inyección de dependencias
  constructor(private _http: HttpClient) { }

  // Método para crear un nuevo producto
  // Recibe un objeto Product como parámetro
  // Utiliza el método post de HttpClient para enviar una solicitud POST al servidor con el nuevo producto
  // Devuelve un observable de tipo Product, que emitirá la respuesta del servidor después de completarse la operación
  saveProduct(product: Product): Observable<Product> {
    return this._http.post<Product>(this._URL, product);
  }

  // Método para recuperar todos los productos existentes
  // Utiliza el método get de HttpClient para realizar una solicitud GET al servidor
  // Devuelve un observable que emite la lista de productos después de completarse la operación
  getAllProducts(): Observable<any> {
    return this._http.get(this._URL);
  }

  // Método para actualizar un producto existente
  // Recibe el ID del producto a actualizar (_id) y el objeto Product con los datos actualizados
  // Utiliza el método put de HttpClient para enviar una solicitud PUT al servidor con los datos actualizados del producto
  // Devuelve un observable que emite la respuesta del servidor después de completarse la operación
  updateOneProduct(_id: any, product: Product): Observable<any> { //!
    return this._http.put(this._URL + _id, product);
  }

  // Método para eliminar un producto existente
  // Recibe el ID del producto a eliminar (_id)
  // Utiliza el método delete de HttpClient para enviar una solicitud DELETE al servidor para eliminar el producto
  // Devuelve un observable que emite la respuesta del servidor después de completarse la operación
  deleteProduct(_id: any): Observable<any> { //!
    return this._http.delete(this._URL + _id);
  }

/*   addHeader(credentials: string) {
    return {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }
  } */
}


//  resumen,
// este servicio Angular (ProductService) proporciona métodos para realizar 
// operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la entidad "Producto". 
// Los métodos utilizan HttpClient para realizar solicitudes HTTP al backend de la API 
// de productos, y los resultados se emiten a través de observables.