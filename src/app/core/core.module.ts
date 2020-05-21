import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiInterceptor} from './http-interceptors/api.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './http-interceptors/auth.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class CoreModule { }
