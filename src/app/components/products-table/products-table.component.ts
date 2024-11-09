import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Product } from '../../services/products';
import { ProductsService } from '../../services/products.service';
import { MaterialModule } from '../../material/Material.module';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SpinerBarComponent } from "../spiner-bar/spiner-bar.component";
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [MaterialModule, MatIconModule, RouterModule, SpinerBarComponent, CommonModule, NgIf],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css',
  providers: [ProductsService]
})

export class ProductsTableComponent implements OnInit, AfterViewInit{

  displayColumns: string[] = ["Name", "Description", "Price"];
  dataSource = new MatTableDataSource<Product>();
  loading: boolean = false;
  hasError: boolean = false;
  noData: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private snackbar: MatSnackBar, private _productService: ProductsService){}
  

  ngOnInit(): void {
    this.getProducts();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "pagina";
    this.dataSource.sort = this.sort;
  }

  getProducts(){
    this.loading = true;
    this.hasError = false;
    this.noData = false;

    this._productService.getProducts().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        if (!data || data.length === 0) {
          this.noData = true;
          this.dataSource.data = [];
          this.showMessage('No hay productos disponibles.');
        } else {
          this.dataSource.data = data;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
        this.hasError = true;
        this.dataSource.data = [];
        this.showMessage('No se pudo conectar con el servidor. Por favor intente más tarde.');
        this.loading = false;
      }
    });
  }

  private showMessage(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProduct(id: number){
    this.loading = true;
    this._productService.deleteProduct(id).subscribe(() =>{
      this.mesageDeletedSucces();
      this.loading = false
      this.getProducts();
    })   
  }

  mesageDeletedSucces(){
    setTimeout(() => {
      this.snackbar.open('the Product has been deleted from the list', '', {
        duration: 3000,
        horizontalPosition:'center'
      });
    });
  }


}
