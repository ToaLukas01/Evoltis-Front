import { Routes } from '@angular/router';
import { AddEditProductsComponent } from './components/add-edit-products/add-edit-products.component';
import { ProductsDetailComponent } from './components/products-detail/products-detail.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';

export const routes: Routes = [
    { path: 'ProductsList', component: ProductsTableComponent }, 
    { path: 'Newproduct', component: AddEditProductsComponent },
    { path: 'ProductDetail/:id', component: ProductsDetailComponent },
    { path: 'EditProduct/:id', component: AddEditProductsComponent },
    { path: '', redirectTo: 'petslist', pathMatch: 'full' }, 
    { path: '**', redirectTo: 'petslist', pathMatch: 'full' } 
];
