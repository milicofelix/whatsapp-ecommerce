import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../models';
import {environment} from '../pipes/environment';

const TOKEN_KEY = 'adr_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    me: User = null;

  constructor(private http: HttpClient) {
      const token = this.getToken();
      this.setUserFromToken(token);
  }

  login(user: {email: string, password: string}): Observable<{token: string}> {

     return this.http
         .post<{token: string}>(`${environment.api.url}/login`, user)
         .pipe(
             tap(response => {

               this.setToken(response.token);

             })
         );
  }

  setToken(token: string) {
      this.setUserFromToken(token);
      token ? window.localStorage.setItem(TOKEN_KEY, token) : window.localStorage.removeItem(TOKEN_KEY);
  }

  private setUserFromToken(token: string) {

      const decodePayLoad = new JwtHelperService().decodeToken(token);
      this.me = decodePayLoad ? {
          id: decodePayLoad.sub,
          name: decodePayLoad.name,
          email: decodePayLoad.email
      } : null;

  }

  getToken(): string | null {
      return window.localStorage.getItem(TOKEN_KEY);
  }
  isAuth(): boolean {
      const token = this.getToken();
      return !new JwtHelperService().isTokenExpired(token, 30);
  }

  logOut(): Observable<any> {
      return this.http
          .post<{token: string}>(`${environment.api.url}/logout`, {})
          .pipe(
              tap(() => {
                  this.setToken(null);
              })
          );
  }

}
