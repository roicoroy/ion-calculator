import { Component, inject, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IonicSelectableComponent } from '../../../components/ionic-selectable/ionic-selectable.component';
import { MenuButtonComponent } from '../../../components/menu-button/menu-button.component';
import { ThemeComponent } from '../../../components/theme/theme.component';
import { NavigationService } from '../../../services/navigation.service';
import { ComponentsModule } from '../../../components/components.module';
import { IAppFacadeState, AppFacade } from '../../../store/app.facade';
import { TutorialActions } from '../../../store/tutorial/tutorial.action';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    ComponentsModule,
    IonicSelectableComponent,
    IonSpinner,
    IonAvatar,
    IonMenuButton,
    IonImg,
    MenuButtonComponent,
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
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ThemeComponent,
    TranslateModule
  ],
})
export class Tab3Page implements OnInit {

  viewState$!: Observable<IAppFacadeState>;

  private facade = inject(AppFacade);

  private store = inject(Store);
  
  private navigation = inject(NavigationService);

  ngOnInit(): void {
    this.viewState$ = this.facade.viewState$;  
  }

  home() {
    this.navigation.navControllerDefault('home', 'back');
  }

  openTutorial() {
    this.store.dispatch(new TutorialActions.SetTutorialComplete(false));
    this.navigation.navigateForward('/home');
  }

}
