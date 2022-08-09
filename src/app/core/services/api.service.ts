import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public baseURL = environment.baseURL;
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

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(
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

  post_with_upload(path: string, body = {}): Observable<any> {
    // Neste post não devemos fazer o stringify do body já que não estamos passando um json, fazemos stringify caso estejamos passando um json.
    return this.http.post(this.baseURL + path, body, {
      observe: 'events',
      reportProgress: true
    });
  }

  delete(path: string): Observable<any> {
    return this.http.delete(this.baseURL + path);
  }
}
