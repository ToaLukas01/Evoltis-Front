import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/Material.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from 'express';
import { Product } from '../../services/products';
import { ProductsService } from '../../services/products.service';
import { SpinerBarComponent } from "../spiner-bar/spiner-bar.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-edit-products',
  standalone: true,
  imports: [MaterialModule, RouterModule, SpinerBarComponent, NgIf],
  templateUrl: './add-edit-products.component.html',
  styleUrl: './add-edit-products.component.css'
})
export class AddEditProductsComponent implements OnInit{

  loading: boolean = false;
  form: FormGroup;
  id: number;
  title!: string

  // a travez de inyecccion de dependencia inyectamos una clase que nos ayude con el formulario reactivo
  constructor(private fb: FormBuilder, private _productService: ProductsService,
    private aRoute: ActivatedRoute, private router: Router,
    private snackBar: MatSnackBar){
    this.form = this.fb.group({
      name: ["", Validators.required],
      description: [""],
      price: ["", Validators.required],
    })
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id != 0) {
      this.title = "Edit"
      this.getProductDetails(this.id);
    } else {
      this.title = "Add new"
    }
  }

  addEditProduct(){
    const product: Product = {
      Name: this.form.value.name,
      Description: this.form.value.description,
      Price: this.form.value.Price
    }
    if(this.id != 0) {
      product.Id = this.id
      this.EditProduct(this.id, product);
    } else {
      this.NewProduct(product);
    }
  }

  getProductDetails(id: number){
    this.loading = true
    this._productService.getProductDetail(id).subscribe(data =>{
      this.form.patchValue({ // con este metodo "macheamos" las propiedades de los datos traidos por la peticion http
        name: data.Name,
        description: data.Description,
        price: data.Price
      })
      this.loading = false
    })
  }

  NewProduct(product: Product){
    this.loading = true
    this._productService.createProduct(product).subscribe(data =>{
      this.loading = false
      this.mesageAddProductSucces();
      this.router.move(['/ProductsList'])
    })
  }

  mesageAddProductSucces(){
    setTimeout(() => {
      this.snackBar.open('the Product has been added in the list', '', {
        duration: 4000,
        horizontalPosition:'center'
      });
    });
  }

  EditProduct(id: number, product: Product){
    this.loading = true
    this._productService.updateProduct(id, product).subscribe(() =>{
      this.loading = false
      this.mesageUpdateSucces();
      this.router.move(['/ProductsList'])
    })
  }

  mesageUpdateSucces(){
    setTimeout(() => {
      this.snackBar.open('the Product has been updated succesfully', '', {
        duration: 4000,
        horizontalPosition:'center'
      });
    });
  }
}
