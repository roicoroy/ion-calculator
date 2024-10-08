import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private alertController = inject(AlertController);

  private router = inject(Router);

  async calculatorAlert(
    data: any,
  ) {
    // console.log('#️⃣#️⃣', data)
    const alertButtons = [
      {
        text: 'OK',
        role: 'confirm',
        htmlAttributes: {
          'aria-label': 'confirm',
        },
      },
    ];
    const alert = await this.alertController.create({
      message: data,
      buttons: alertButtons,
    });

    await alert.present();
  }

  async presentSimpleAlert(
    message: string,
  ) {
    const alertButtons = [
      {
        text: 'OK',
        role: 'confirm',
        htmlAttributes: {
          'aria-label': 'confirm',
        },
      },
    ];
    const alert = await this.alertController.create({
      message,
      buttons: alertButtons,
    });

    await alert.present();
  }

  async presentSimpleAlertNavigate(
    message: string,
    navigateTo: string,
  ) {
    const alertButtons = [
      {
        text: 'OK',
        role: 'confirm',
        htmlAttributes: {
          'aria-label': 'confirm',
        },
        handler: () => {
          this.router.navigateByUrl(navigateTo);
        },
      },
    ];
    const alert = await this.alertController.create({
      // header,
      // subHeader,
      message,
      buttons: alertButtons,
    });

    await alert.present();
  }

}
