import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { IonMenuToggle, ModalController, IonThumbnail, IonHeader, IonButtons, IonToolbar, IonTitle, IonButton, IonIcon, IonMenuButton, IonContent, IonItem, IonCardContent, IonCard, IonGrid, IonRow, IonCol, IonSpinner, IonImg, IonText, IonLabel } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { WaitersModalComponent } from './waiters-modal/waiters-modal.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SumPointsArrayPipe } from '../../calculator/sum-array.pipe';
import { Store } from '@ngxs/store';
import { ComponentsModule } from '../../../components/components.module';
import { IonicSelectableIconTemplateDirective } from '../../../components/ionic-selectable/ionic-selectable-icon-template.directive';
import { IonicSelectableValueTemplateDirective } from '../../../components/ionic-selectable/ionic-selectable-value-template.directive';
import { IonicSelectableComponent } from '../../../components/ionic-selectable/ionic-selectable.component';
import { MenuButtonComponent } from '../../../components/menu-button/menu-button.component';
import { IWaiter, Waiter } from '../../../models';
import { NavigationService } from '../../../services/navigation.service';
import { WaiterActions } from '../../../store/waiters/waiter.action';
import { IAppFacadeState, AppFacade } from '../../../store/app.facade';
import { TranslateModule } from '@ngx-translate/core';
import { PointActions } from 'src/app/store/points/point.action';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonMenuToggle,
    IonLabel,
    IonThumbnail,
    IonText,
    IonImg,
    IonSpinner,
    IonCol,
    IonRow,
    IonGrid,
    IonCard,
    IonCardContent,
    IonItem,
    IonContent,
    IonIcon,
    IonButton,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    MenuButtonComponent,
    IonHeader,
    IonButtons,
    ComponentsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicSelectableComponent,
    IonicSelectableValueTemplateDirective,
    IonicSelectableIconTemplateDirective,
    SumPointsArrayPipe,
    TranslateModule
  ],
})
export class Tab1Page implements OnInit {

  @ViewChild('selectPointsComponent') selectPointsComponent!: IonicSelectableComponent;

  private modalController = inject(ModalController);

  private store = inject(Store);

  private navigation = inject(NavigationService);

  viewState$!: Observable<IAppFacadeState>;

  private facade = inject(AppFacade);

  title = 'Waiters Page';

  presentingElement: any;

  ngOnInit() {
    this.viewState$ = this.facade.viewState$;
    this.presentingElement = document.querySelector('.ion-page');
  }

  async addWaiter() {
    const modal = await this.modalController.create({
      component: WaitersModalComponent,
    });
    await modal.present();
  }

  async editWaiter(waiter: IWaiter, i?: number) {
    const modal = await this.modalController.create({
      component: WaitersModalComponent,
      componentProps: {
        waiter,
      },
      // presentingElement: this.presentingElement,
    });
    await modal.present();
  }

  onSelectTableChange($event: any, i: number): void {
    const waiters = this.store.selectSnapshot<any>((state: any) => state.waiter?.waiters);
    const waiter = new Waiter({
      id: waiters[i].id,
      name: waiters[i].name,
      pointsList: $event.value,
      avatar: waiters[i].avatar,
    });
    this.store.dispatch(new WaiterActions.Update(waiter, waiter.id));
  }

  deleteWaiter(waiter: any, i: number) {
    this.store.dispatch(new WaiterActions.Delete(waiter, i));
  }

  async homePage() {
    await this.navigation.navControllerDefault('home');
  }

  populateWaiters() {
    this.store.dispatch(new WaiterActions.PopulateWaitersList());
    this.store.dispatch(new PointActions.PopulatePoints());
  }

}
