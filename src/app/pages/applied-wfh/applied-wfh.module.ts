import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AppliedWfhPage } from './applied-wfh.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [AppliedWfhPage]
})
export class AppliedWfhPageModule {}
