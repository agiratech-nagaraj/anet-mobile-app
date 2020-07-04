import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

import { IonicModule } from '@ionic/angular';

import { WfhPage } from './wfh.page';

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
