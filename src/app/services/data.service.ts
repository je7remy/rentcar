
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Node/Express API
  REST_API = environment.RUTA_SERVER;



  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }
  // Add



  ConsultasRemote(metodo: any, datos: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${datos.jwt}`
    })
    let API_URL = `${this.REST_API}/${metodo}`;
    return this.httpClient.get(API_URL, { headers: headers })
  }

  ConsultasRemotes(data: any, metodo: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.jwt}`
    })
    let API_URL = `${this.REST_API}/${metodo}`;
    return this.httpClient.put(API_URL, data, { headers: headers })
      .pipe(
      // catchError(this.handleError)
    )
  }
  ConsultasRemotesPost(data: any, metodo: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.jwt}`
    })
    let API_URL = `${this.REST_API}/${metodo}`;
    return this.httpClient.post(API_URL, data, { headers: headers })
      .pipe(
      // catchError(this.handleError)
    )
  }

  DeleteRemotes(data: any, metodo: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.jwt}`
    })
    let API_URL = `${this.REST_API}/${metodo}`;
    return this.httpClient.delete(API_URL, { headers: headers, body: data })
      .pipe(
      // catchError(this.handleError)
    )
  }
  LoginRemote(data: any): Observable<any> {
    let API_URL = `${this.REST_API}/login`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
      // catchError(this.handleError)
    )
  }
  gets(data: any): Observable<any> {
    let API_URL = `${this.REST_API}/login`;
    return this.httpClient.get(API_URL, data)
      .pipe(
      // catchError(this.handleError)
    )
  }
  // Delete
  deleteUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-user/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }
  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  clogin(datos: any) {
    let API_URL = `${this.REST_API}/login`;
    return this.httpClient.post(
      `${API_URL}/login.php`,
      datos
    ).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  consultas(datos: any, metodo: string) {
    return this.httpClient.post(
      `${this.REST_API}/${metodo}`,
      datos
    ).pipe(
      map(resp => {
        if (!resp) {
          localStorage.clear();
          return false
        }
        else {
          return resp;
        }
      }))
  }

  async consultass(datos: any, metodo: string): Promise<any> {
    const response: any = await this.httpClient.post(
      `${this.REST_API}${metodo}`, datos).toPromise();
    return response;
  }

}