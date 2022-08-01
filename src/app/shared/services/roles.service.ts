import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private apiService: ApiService) { }

  getRoles(): Observable<any> {
    return this.apiService.get('/roles');
  }
}
