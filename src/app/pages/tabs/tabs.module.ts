import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
     { path: 'timesheets', loadChildren: () => import('../time-sheets/time-sheets.module').then(m => m.TimeSheetsPageModule) },
     { path: 'applied_wfh', loadChildren: () => import('../applied-wfh/applied-wfh.module').then(m => m.AppliedWfhPageModule) },
     { path: 'wfh', loadChildren: () => import('../wfh/wfh.module').then(m => m.WfhPageModule) },
     { path: 'logtime', loadChildren: () => import('../log-time/log-time.module').then(m => m.LogTimePageModule) },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/logtime',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
