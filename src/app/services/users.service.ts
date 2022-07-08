import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../entities/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = 'http://localhost:3000/api/v1/users';
  options = {
    headers : new HttpHeaders().set('Access-Control-Allow-Origin',"*")
  }

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.usersUrl, this.options)
  }

}
