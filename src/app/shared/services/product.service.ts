import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  search = new BehaviorSubject<string>('');
  cart = new BehaviorSubject<any[]>(JSON.parse(localStorage.getItem('cart') as string) || []);

  constructor(private apiService: ApiService) {}

  getCategories(): Observable<any> {
    return this.apiService.get('/categories');
  }

  getProducts(
    category: number,
    search: string,
    take: number,
    skip: number
  ): Observable<any> {
    let fields: any = {};
    if (category !== 0) {
      fields.category = category;
    }
    if (take) {
      fields.take = take;
    }
    if (skip) {
      fields.skip = skip;
    }
    if (search !== '') {
      fields.search = search;
    }
    let queryString = new URLSearchParams(fields).toString();
    return this.apiService.get(`/product?${queryString}`);
  }

  createProducts(fData: FormData): Observable<any> {
   // Um form data é enviado como string ou blob
    return this.apiService.post_with_upload('/product', fData);
  }

  setCartValue(product: any) {
    this.cart.next(product);
  }

  getCartValue() {
    return this.cart;
  }

  setSearchValue(search: string) {
    this.search.next(search);
  }

  getSearchValue() {
    return this.search;
  }
}
