import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TimeSheetsPage } from './time-sheets.page';

const routes: Routes = [
  {
    path: '',
    component: TimeSheetsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TimeSheetsPage]
})
export class TimeSheetsPageModule {}
