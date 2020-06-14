import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from './core/guards/auth.guard.service';
import {NoAuthGuardService} from './core/guards/no.auth.guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuardService],
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInPageModule),
    canLoad: [NoAuthGuardService],
  },
  {
    path: 'wfh',
    loadChildren: () => import('./pages/wfh/wfh.module').then(m => m.WfhPageModule),
    canLoad: [AuthGuardService],
  },
  {
    path: 'applied-wfh',
    loadChildren: () => import('./pages/applied-wfh/applied-wfh.module').then(m => m.AppliedWfhPageModule),
    canLoad: [AuthGuardService],
  },
  {
    path: 'log-time',
    loadChildren: () => import('./pages/log-time/log-time.module').then(m => m.LogTimePageModule),
    canLoad: [AuthGuardService],
  },
  {
    path: 'time-sheets',
    loadChildren: () => import('./pages/time-sheets/time-sheets.module').then(m => m.TimeSheetsPageModule),
    canLoad: [AuthGuardService],
  },
  {
    path: 'home',
    canLoad: [AuthGuardService],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
