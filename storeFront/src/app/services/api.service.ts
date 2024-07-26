import { HttpClient, HttpHeaders, HttpContext } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, options: any): Observable<T> {
    return this.http.get<T>(url, options) as Observable<T>;
  }

  post<T>(url: string, options: Options, body: any): Observable<T> {
    return this.http.post(url, body) as Observable<T>;
  }
}
