import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrl } from 'config/apiUrl';
import { Product } from 'src/app/Interfaces/product.interface';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${apiUrl}`;
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<{ data:Product[] }>(`${this.apiUrl}/products`, { withCredentials: true })
      .pipe(
        map((response) => {
          console.log('API Response:', response);
          return response.data;
        })
      );
  }

  // Add a new product
  addProduct(product: Product): Observable<Product> {
    console.log(product);
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }
}
export { Product };

