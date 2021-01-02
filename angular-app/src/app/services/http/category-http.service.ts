import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Category} from '../../models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpResource, SearchParams, SearchParamsBuider} from './http-resource';

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService implements HttpResource<Category> {

  private baseUrl = 'http://localhost:8000/api/categories';

  constructor(private http: HttpClient) { }

  list(searchParams: SearchParams): Observable<{ data: Array<Category>, meta: any }> {
      const sParams = new SearchParamsBuider(searchParams).makeObject();
      const params = new HttpParams({
          fromObject: (sParams as any)
      });
      return this.http
          .get<{ data: Array<Category>, meta: any }>
          (this.baseUrl, {params});
  }

  get(id: number): Observable<Category> {
      return this.http
          .get<{ data: Category }>
          (`${this.baseUrl}/${id}`)
          .pipe(
              map(response => response.data)
          );
  }

  create(data: Category): Observable<Category> {
      return this.http
          .post<{ data: Category }>(this.baseUrl, data).pipe(
          map(response => response.data)
      );
  }

  update(id: number, data: Category): Observable<Category> {
      return this.http
          .put<{ data: Category }>(`${this.baseUrl}/${id}`, data).pipe(
          map(response => response.data)
      );
  }

  destroy(id: number): Observable<any> {
      return this.http
          .delete(`${this.baseUrl}/${id}`);
  }
}
