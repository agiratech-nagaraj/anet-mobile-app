import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WfhPage } from './wfh.page';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: WfhPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WfhPage]
})
export class WfhPageModule {}
