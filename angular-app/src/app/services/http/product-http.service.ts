import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../../models";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResource, SearchParams, SearchParamsBuider} from "./http-resource";

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService implements HttpResource<Product>{

  private baseUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) { }

  list(searchParams: SearchParams):Observable<{ data:Array<Product>, meta:any }>{
      const sParams = new SearchParamsBuider(searchParams).makeObject();
      const params = new HttpParams({
          fromObject: (<any>sParams)
      });
      return this.http
          .get<{ data:Array<Product>, meta:any }>
          (this.baseUrl,{params});
  }

  get(id:number):Observable<Product>{
      return this.http
          .get<{ data: Product }>
          (`${this.baseUrl}/${id}`)
          .pipe(
              map(response => response.data)
          );
  }

  create(data: Product):Observable<Product>{
      return this.http
          .post<{ data: Product }>(this.baseUrl, data).pipe(
          map(response => response.data)
      );
  }

  update(id:number,data:Product):Observable<Product>{
      return this.http
          .put<{ data: Product }>(`${this.baseUrl}/${id}`, data).pipe(
          map(response => response.data)
      );
  }

  destroy(id:number):Observable<any>{
      return this.http
          .delete(`${this.baseUrl}/${id}`);
  }
}