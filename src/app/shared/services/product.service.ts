import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  search = new BehaviorSubject<string>('');

  constructor(private apiService: ApiService) { }

  getCategories(): Observable<any> {
    return this.apiService.get('/categories');
  }

  getProducts(category: number, page: number, search: string): Observable<any> {
    let fields: any = {};
    if(category !== 0) {
      fields.category = category;
    }
    if(page > 0) {
      fields.page = page;
    }
    if(search !== '') {
      fields.search = search;
    }
    let queryString = new URLSearchParams(fields).toString();
    return this.apiService.get(`/products?${queryString}`);
  }

  setSearchValue(search: string) {
    this.search.next(search);
  }

  getSearchValue() {
    return this.search;
  }
}
