import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../model/user';
import { Observable, throwError  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private httpclient: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/spring-rest-api/users';

  getusers(page: number,size :number):Observable<any>{
    return this.httpclient.get<any>(this.baseUrl+'?page='+(page)+'&size='+size)
    //.pipe( catchError((err)=> throwError(err))
    //);
  }

  public getuserbyid(id: string): Observable<any> {
    return this.httpclient.get<any>(`${this.baseUrl}/id/${id}`);
  }

  public postuser(User: user): Observable<any> {
    const headers = { 'Content-Type': 'application/json'}
    const body = JSON.stringify(User);
    //const body = {"name":"prova"}
    return this.httpclient
      .post<user>(`${this.baseUrl}/create`, body, { headers: headers });
  }

  public putuser(id: string, User: user): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(User);
    return this.httpclient
      .put<user>(`${this.baseUrl}/put/${id}`, body, { headers: headers });
  }

  public deleteuser(id: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.httpclient
      .delete<user>(`${this.baseUrl}/delete/${id}`, { headers: headers });
  }
}
