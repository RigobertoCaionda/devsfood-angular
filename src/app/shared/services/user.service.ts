import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUser } from 'src/app/core/models/update_user';
import { User } from 'src/app/core/models/user';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  me(): Observable<User> {
    return this.apiService.get('/user/info/me');
  }

  update(id: number, user: UpdateUser): Observable<User> {
    return this.apiService.patch(`/user/${id}`, user);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete(`/user/${id}`);
  }
}
