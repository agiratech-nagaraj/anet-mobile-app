import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {StorageKeys, StorageService} from '../../storage';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor() {
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

        return next.handle(request);

    }

}
