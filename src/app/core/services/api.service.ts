import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public baseURL = environment.baseURL;
  //showErrorPopUp = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {}
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(this.baseURL + path, { params });
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      this.baseURL + path,
      JSON.stringify(body),
      this.httpOptions
    );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      this.baseURL + path,
      JSON.stringify(body),
      this.httpOptions
    );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(this.baseURL + path);
  }
}
