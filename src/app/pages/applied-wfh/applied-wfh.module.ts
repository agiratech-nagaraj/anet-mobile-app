import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';

import { IonicModule } from '@ionic/angular';

import { AppliedWfhPage } from './applied-wfh.page';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AppliedWfhPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatMenuModule,
  ],
  declarations: [AppliedWfhPage]
})
export class AppliedWfhPageModule {}
