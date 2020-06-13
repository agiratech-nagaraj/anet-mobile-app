import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TimeSheetsPage } from './time-sheets.page';
import {SharedModule} from '../../shared/shared.module';
import {MatMenuModule} from "@angular/material/menu";

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
    RouterModule.forChild(routes),
    SharedModule,
    MatMenuModule,
  ],
  declarations: [TimeSheetsPage]
})
export class TimeSheetsPageModule {}
