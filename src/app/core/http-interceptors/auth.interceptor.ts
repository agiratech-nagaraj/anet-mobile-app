import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

import {StorageKeys, StorageService} from '../../storage';
import {AlertService} from '../alert.service';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const userData = StorageService.instance.getItem(StorageKeys.auth, true);
    if (userData) {
      let headers = request.headers.append('access-token', userData['access-token']);
      headers = headers.set('client', userData.client);
      headers = headers.set('uid', userData.uid);
      request = request.clone({
        headers
      });
    }

    if (!/sign_in/.test(request.url) && !userData) {
      this.clearSessionState();
      return;
    }

    return next.handle(request).pipe(
      tap((res: HttpEvent<HttpResponse<any>>) => {
        if (res instanceof HttpResponse && res.status === 401) {
          this.clearSessionState();
        }
      })
    );

  }

  clearSessionState() {
    this.authService.clearSessionState();
    this.alertService.toastAlert('Your session was closed! please sign in again');
    this.router.navigateByUrl('/sign-in');
  }

}
