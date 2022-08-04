import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiService: ApiService) { }

  create(fData: FormData): Observable<any> {
    return this.apiService.post_with_upload('/categories', fData);
  }
}
