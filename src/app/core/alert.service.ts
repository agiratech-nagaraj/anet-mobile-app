import { Injectable } from '@angular/core';
import {toastEnter} from '../shared/animations/toastAnimation/toast';
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
      message: msg,
      duration: 400,
      position: 'top',
      enterAnimation: toastEnter,
    });
    toast.present();
    return  toast;
  }

}
