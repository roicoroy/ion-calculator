import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PointsModalComponent } from './points-modal/points-modal.component';
import { ModalController } from '@ionic/angular/standalone';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonItem,
  IonCol,
  IonRow,
  IonGrid,
  IonMenu,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonText,
  IonFooter,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonImg,
  IonSpinner,
  IonAvatar,
  IonMenuButton,
  IonBadge,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../../components/components.module';
import { ModalAnimationsService } from '../../../services/animations/modal-animations.service';
import { NavigationService } from '../../../services/navigation.service';
import { Point } from '../../../models';
import { PointActions } from '../../../store/points/point.action';
import { IAppFacadeState, AppFacade } from '../../../store/app.facade';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonBadge,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonItem,
    IonCol,
    IonRow,
    IonGrid,
    IonMenu,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonIcon,
    IonLabel,
    IonText,
    IonFooter,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonImg,
    IonSpinner,
    IonAvatar,
    IonMenuButton,
    ComponentsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ]
})
export class Tab2Page {

  title = 'Points page'

  viewState$: Observable<IAppFacadeState>;

  private facade = inject(AppFacade);

  constructor(
    public modalController: ModalController,
    private store: Store,
    private animations: ModalAnimationsService,
    private navigation: NavigationService,
  ) {
    this.viewState$ = this.facade.viewState$;
  }

  async addPoint() {
    const modal = await this.modalController.create({
      component: PointsModalComponent,
      animated: true,
      enterAnimation: this.animations.enterAnimation,
      leaveAnimation: this.animations.leaveAnimation
    });
    await modal.present();
  }

  async editPoint(point: Point) {
    const modal = await this.modalController.create({
      component: PointsModalComponent,
      cssClass: 'modal-class',
      componentProps: {
        point,
      },
      animated: true,
      enterAnimation: this.animations.enterAnimation,
      leaveAnimation: this.animations.leaveAnimation
    });
    await modal.present();
  }

  delete(point: Point) {
    this.store.dispatch(new PointActions.DeletePoint(point));
  }

  async homePage() {
    await this.navigation.navControllerDefault('home');
  }
  
  populatePoints() {
    this.store.dispatch(new PointActions.PopulatePoints());
  }

}
