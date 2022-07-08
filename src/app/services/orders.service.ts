import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Orders } from '../entities/orders';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersUrl = 'http://localhost:3000/api/v1/orders';
  options = {
    headers : new HttpHeaders().set('Access-Control-Allow-Origin',"*")
  }

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.ordersUrl, this.options)
  }

  addOrder(ord: Orders): Observable<Orders> {
    return this.http.post<Orders>(this.ordersUrl, ord, this.options)
  }

  deleteOrder(id:any): Observable<Orders> {
    return this.http.delete<Orders>(this.ordersUrl+'/'+id, this.options)
  }

  updateOrder(id:any, ord:Orders): Observable<Orders> {
    return this.http.put<Orders>(this.ordersUrl+'/'+id, ord, this.options)
  }

}
