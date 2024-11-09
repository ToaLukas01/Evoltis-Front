import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from './products';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.endpoint}/api/Products`;
  }

  getProducts(): Observable<Product[]> {
    console.log("Ingresando al meto Get Lista");
    return this.http.get<Product[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductDetail(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error en el servidor';
    
    if (error.status === 0) {
      // Error de cliente o problemas de red
      errorMessage = 'Error de conexión. Por favor verifica tu conexión a internet.';
  } else {
      // Error del backend
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
  }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
