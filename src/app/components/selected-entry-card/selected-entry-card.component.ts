import { Component, inject, Input, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  IonCol,
  IonRow,
  IonGrid,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonText,
  IonButton,
  IonToolbar,
  IonFooter,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButtons,
  IonItemGroup,
  IonAvatar,
  IonHeader, IonBadge } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { Entry } from '../../models';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IAppFacadeState, AppFacade } from 'src/app/store/app.facade';
import { SumPointsArrayPipe } from 'src/app/pages/calculator/sum-array.pipe';

@Component({
  selector: 'selected-entry-card',
  templateUrl: './selected-entry-card.component.html',
  styleUrls: ['./selected-entry-card.component.scss'],
  standalone: true,
  imports: [IonBadge, 
    CommonModule,
    FormsModule,
    NgxsModule,
    NgxsFormPluginModule,
    IonItemGroup,
    IonAvatar,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonFooter,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonText,
    IonCol,
    IonRow,
    IonGrid,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    TranslateModule,
    SumPointsArrayPipe
  ]
})
export class SelectedEntryCardComponent implements OnDestroy {

  @Input()
  selectedEntry!: Entry;

  currency: string | undefined;

  readonly sanitizer = inject(DomSanitizer);

  viewState$!: Observable<IAppFacadeState>;

  private facade = inject(AppFacade);

  private readonly ngUnsubscribe = new Subject();

  constructor() {
    this.viewState$ = this.facade.viewState$;
    this.viewState$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((vs) => {
        this.currency = vs.language === 'en' ? 'GBP' : 'BRL';
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
