import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  title:string = "Crear Producto";
  productForm: FormGroup;

  constructor(private _fb:FormBuilder){
    this.productForm = this._fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      location: ['', [Validators.required]],
      img: ['', [Validators.required]],
      price: ['', [Validators.required]],
    })
  }
  
  ngOnInit(): void {
    
  }

  addProduct() {

  }

  validateInput(typeName:string):boolean{
    let obj = this.productForm.get(typeName);
    return obj !==null && obj?.invalid && obj.touched;
  }

}
