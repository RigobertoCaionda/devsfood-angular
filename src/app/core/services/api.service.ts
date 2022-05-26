import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseURL = environment.baseURL;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
  }

  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(() => new Error(JSON.stringify(error))); // Lanca um erro no console explicando o erro que teve, o JSON.stringify é para não aparecer object object como erro. Esse erro só é lançado caso eu não recuperar o erro no ts com subscribe.
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(this.baseURL+path, { params }).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(this.baseURL+path, JSON.stringify(body), this.httpOptions)
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(this.baseURL+path, JSON.stringify(body), this.httpOptions)
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(this.baseURL+path).pipe(catchError(this.formatErrors));
  }
  
}
