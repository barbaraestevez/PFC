import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent { //implements OnInit
  listProducts: Product[]=[];

  constructor(
    private _productService:ProductService, // _ps = productService
    private _activatedRoute:ActivatedRoute //_ar = activatedRoute
  ){
    this._activatedRoute.data.subscribe((data:any) => {
      this.listProducts = data.productList;
    })
  }

  // ngOnInit(): void {
  //   this._productService.getAllProducts().subscribe((data)=>{
  //     console.log(data);
  //     this.listProducts = data;
  //   })
  // }

}
