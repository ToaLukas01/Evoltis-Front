import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/Material.module';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../services/products';
import { ActivatedRoute } from '@angular/router';
import { SpinerBarComponent } from '../spiner-bar/spiner-bar.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-products-detail',
  standalone: true,
  imports: [MaterialModule, SpinerBarComponent, CommonModule, NgIf],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.css'
})
export class ProductsDetailComponent implements OnInit{

  id: number;
  product!: Product;
  loading: boolean = false;

  constructor(private _productService: ProductsService, private aRoute: ActivatedRoute){
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void { 
    // this.aRoute.params.subscribe(data =>{  // --> otra forma de obtener el ID
    //   this.id = data['id']
    // })
    this.getPetDetail()
  }

  getPetDetail(){
    this.loading = true
    this._productService.getProductDetail(this.id).subscribe(data =>{
      this.product = data;
      this.loading = false
    })
  }
}
