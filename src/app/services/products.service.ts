import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../entities/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private prooductsUrl = 'http://localhost:3000/api/v1/products';
  options = {
    headers : new HttpHeaders()
  }

  constructor(private http: HttpClient) { }

  getProducts(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.prooductsUrl +"/"+id, this.options)
  }

  addProduct(ord: Products): Observable<Products> {
    return this.http.post<Products>(this.prooductsUrl, ord, this.options)
  }

  deleteProducts(id:any): Observable<Products> {
    return this.http.delete<Products>(this.prooductsUrl+'/'+id, this.options)
  }

  deleteAllProducts(id:any): Observable<Products> {
    return this.http.delete<Products>(this.prooductsUrl+'/all/'+id, this.options)
  }

  updateProducts(id:any, ord:Products): Observable<Products> {
    return this.http.put<Products>(this.prooductsUrl+'/'+id, ord, this.options)
  }
}
