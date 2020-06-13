import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AppliedWfhPage } from './applied-wfh.page';
import {SharedModule} from '../../shared/shared.module';
import {MatMenuModule} from "@angular/material/menu";

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
