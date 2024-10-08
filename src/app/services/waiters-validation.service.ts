import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { IStates, Waiter } from '../models';
import { AlertController } from '@ionic/angular/standalone';
export const DARK_MODE = 'dark_mode';

@Injectable({
  providedIn: 'root'
})
export class WaitersValidationService {

  private store = inject(Store);

  private alertController = inject(AlertController);

  private alert: any;

  async validateCalculator(): Promise<boolean> {
    const savedResults = this.store.selectSnapshot<any>((state: IStates) => state.waiter.waiters);

    console.log('#️⃣', savedResults);

    let noAvatar: any[] = [];
    let noPoints: any[] = [];
    if (savedResults) {
      savedResults.forEach((w: Waiter) => {
        if (!w.avatar) {
          noAvatar.push(w.name);
        }
        if (!w.pointsList?.length) {
          noPoints.push(w.name);
        }
      });
      let myMessage;
      let noAvatarMessage;
      let noPointsMessage;
      if (noAvatar?.length) {
        noAvatarMessage = `add avatar for ${noAvatar.join(', ')}`
      } else {
        noAvatarMessage = null;
      }
      if (noPoints?.length) {
        noPointsMessage = `add points for ${noPoints.join(', ')}`
      } else {
        noPointsMessage = null;
      }
      myMessage = [noAvatarMessage, noPointsMessage];
      // avatar
      if (myMessage[0] && !myMessage[1]) {
        await this.presentAlert(myMessage[0]);
        return false;
      }
      // // points
      if (myMessage[1] && !myMessage[0]) {
        await this.presentAlert(myMessage[1]);
        return false;
      }
      if (myMessage[0] && myMessage[1]) {
        myMessage = myMessage.join(' and ');
        await this.presentAlert(myMessage);
        return false;
      }
      // pass
      if (!noAvatarMessage && !noPointsMessage) {
        return true;
      }
      return false;
    } else {
      await this.presentAlert('Please add data to Start');
      return false;
    }
  }

  async presentAlert(message: string) {
    const alertButtons = [
      {
        text: 'OK',
        role: 'confirm',
      },
    ];

    this.alert = await this.alertController.create({
      message,
      buttons: alertButtons,
    });
    await this.alert.present();
  }
}
