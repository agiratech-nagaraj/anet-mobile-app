import { Injectable } from '@angular/core';
import {toastEnter} from 'src/app/toastAnimation/toast';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toast: ToastController,
  ) { }

  async toastAlert(msg: string) {
    const toast = await this.toast.create({
      header: 'Error',
      message: 'Hi, Your password don\'t match',
      duration: 400,
      position: 'top',
      enterAnimation: toastEnter,
    });
    toast.present();
    return  toast;
  }

}
