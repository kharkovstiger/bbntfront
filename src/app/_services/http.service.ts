import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class HttpService {

  private readonly token: string;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  createAuthorizationHeader(headers: HttpHeaders): HttpHeaders {
    headers=headers.append('Authorization', this.token);
    return headers;
  }

  get<T>(url: string, auth: boolean) {
    let headers = new HttpHeaders();
    if (auth) {
      headers=this.createAuthorizationHeader(headers);
    }
    return this.http.get<T>(url, {headers: headers});
  }

  post<T>(url: string, data: object, auth: boolean) {
    let headers = new HttpHeaders();
    if (auth) {
      headers=this.createAuthorizationHeader(headers);
    }
    return this.http.post<T>(url, data, {headers: headers});
  }

  put<T>(url: string, data: object, auth: boolean) {
    let headers = new HttpHeaders();
    if (auth) {
      headers=this.createAuthorizationHeader(headers);
    }
    return this.http.put<T>(url, data, {headers: headers});
  }

  delete<T>(url: string,auth: boolean) {
    let headers = new HttpHeaders();
    if (auth) {
      headers=this.createAuthorizationHeader(headers);
    }
    return this.http.delete<T>(url, {headers: headers});
  }
}
