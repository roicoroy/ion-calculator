import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
  IonIcon
} from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { SelectedEntryCardComponent } from "../../components/selected-entry-card/selected-entry-card.component";
import { ComponentsModule } from '../../components/components.module';
import { MenuButtonComponent } from '../../components/menu-button/menu-button.component';
import { NavigationService } from '../../services/navigation.service';
import { IAppFacadeState, AppFacade } from '../../store/app.facade';
import { ResultActions } from '../../store/result/result.action';

@Component({
  selector: 'app-result',
  templateUrl: 'result.page.html',
  styleUrls: ['result.page.scss'],
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
    IonTitle,
    IonContent,
    IonMenuButton,
    IonFooter,
    IonCol,
    IonRow,
    IonGrid,
    CommonModule,
    ComponentsModule,
    SelectedEntryCardComponent
  ]
})
export class ResultPage implements OnDestroy, OnInit {

  title = 'Result'

  viewState$!: Observable<IAppFacadeState>;

  private facade = inject(AppFacade);

  private navigation = inject(NavigationService);

  private store = inject(Store);

  ngOnInit(): void {
    this.viewState$ = this.facade.viewState$;
  }

  async home() {
    await this.navigation.navControllerDefault('/home');
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResultActions.RemoveSelectedResult());
  }
}
