import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponseBase
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router  ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(
                tap( (event: HttpEvent<any>) => {
                    this.setNewToken(event);
                },
                    (eventError: HttpEvent<any>) => {
                    this.setNewToken(eventError);
                    this.redirectToLogin(eventError);
                    }
                )
            );
    }

    private redirectToLogin(eventError: HttpEvent<any>) {

      if (eventError instanceof HttpErrorResponse && eventError.status == 401) {
          this.authService.setToken(null);
          this.router.navigate(['login']);
      }

    }

    private setNewToken(event: HttpEvent<any>) {

    if (event instanceof HttpResponseBase) {
        const authorizationHeader = event.headers.get('authorization');
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            this.authService.setToken(token);
        }

        }

    }
}
