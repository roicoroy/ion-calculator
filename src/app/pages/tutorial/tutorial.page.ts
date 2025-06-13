import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core';
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
  IonGrid
} from '@ionic/angular/standalone';
import { IonicSlides } from '@ionic/angular';
import { NavigationService } from '../../services/navigation.service';
import { TutorialActions } from '../../store/tutorial/tutorial.action';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@Component({
  selector: 'app-tutorial',
  templateUrl: 'tutorial.page.html',
  styleUrls: ['tutorial.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonText,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    CommonModule,
    IonFooter,
    IonCol,
    IonRow,
    IonGrid,
    TranslateModule,
    ComponentsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TutorialPage {
  swiperModules = [IonicSlides];

  @ViewChild('swiper') swiperRef: any;

  constructor(
    private store: Store,
    private navigation: NavigationService,

  ) { }

  next() {
    this.swiperRef.nativeElement.swiper.slideNext();
  }

  previous() {
    this.swiperRef.nativeElement.swiper.slidePrev();
  }

  skipWalkthrough(): void {
    // const length = this.swiperRef?.nativeElement.swiper.slides.length
    // this.swiperRef.nativeElement.swiper.slideTo(length);
    this.finish()
  }

  finish() {
    this.store.dispatch(new TutorialActions.SetTutorialComplete(true));
    this.navigation.navigateForward('/home');
  }
}
