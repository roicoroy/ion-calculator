import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  IonButton,
  IonText,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonFooter,
  IonCol,
  IonRow,
  IonGrid,
  AlertController,
  IonMenuToggle,
  IonIcon
} from '@ionic/angular/standalone';
import { ComponentsModule } from '../../components/components.module';
import { MenuButtonComponent } from '../../components/menu-button/menu-button.component';
import { IStates, Waiter } from '../../models';
import { NavigationService } from '../../services/navigation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    MenuButtonComponent,
    IonButton,
    IonText,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle, IonContent,
    CommonModule,
    IonMenuButton,
    ComponentsModule,
    IonFooter,
    IonCol,
    IonRow,
    IonGrid,
    TranslateModule,
    IonMenuToggle
  ],
})
export class HomePage implements OnInit {
  pages = new Array(10);

  private navigation = inject(NavigationService);

  private store = inject(Store);

  private alertController = inject(AlertController);

  private translation = inject(TranslateService);

  alert: any;

  hasData: boolean = false;

  ngOnInit(): void {

  }

  ionViewWillEnter() {
    this.isButtonDisabled();
  }

  async settings() {
    await this.navigation.navigateFadeOut('settings/tabs/waiters');
  }

  isButtonDisabled(): boolean {
    const savedResults = this.store.selectSnapshot<any>((state: IStates) => state.waiter.waiters);
    console.log(savedResults.length)
    if (savedResults.length >= 1) {
      return this.hasData = true;
    } else {
      return this.hasData = false;
    }
  }

  async validateCalculator(): Promise<boolean> {
    const savedResults = this.store.selectSnapshot<any>((state: IStates) => state.waiter.waiters);
    // console.log(savedResults)
    let noAvatar: any[] = [];
    let noPoints: any[] = [];
    if (savedResults.length >= 1) {
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
        noAvatarMessage = `${this.translation.instant('ADD_AVATAR_TO')} : ${noAvatar.join(', ')}`
      } else {
        noAvatarMessage = null;
      }
      if (noPoints?.length) {
        noPointsMessage = `${this.translation.instant('ADD_POINTS_TO')} : ${noPoints.join(', ')}`
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
        // myMessage = myMessage.join(' and ');
        myMessage = myMessage.join(` ${this.translation.instant('AND')} `);
        await this.presentAlert(myMessage);
        return false;
      }
      // pass
      if (!noAvatarMessage && !noPointsMessage) {
        return true;
      }
      return false;
    } else {
      const mess = this.translation.instant('ADD_DATA_START');
      await this.presentAlert(mess);
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

  async calculatorPage() {
    const res = await this.validateCalculator();
    if (res) {
      this.navigation.navigateFadeOut('calculator');
    }
  }

  async savedItems() {
    await this.navigation.navigateFadeOut('saved-entries');
  }

  async result() {
    await this.navigation.navigateFadeOut('result');
  }

}
