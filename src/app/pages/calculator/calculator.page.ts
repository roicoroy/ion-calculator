import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AlertController, IonAccordionGroup, IonDatetime, PickerController, PickerOptions } from '@ionic/angular/standalone';
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
  IonIcon,
  IonItem,
  IonMenu,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonImg,
  IonSpinner,
  IonAvatar,
  IonBadge,
  IonInput,
  IonAccordion,

} from '@ionic/angular/standalone';
import { CalculatorService } from './calculator.service';
import { SumPointsArrayPipe } from './sum-array.pipe';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ComponentsModule } from '../../components/components.module';
import { MenuButtonComponent } from '../../components/menu-button/menu-button.component';
import { Waiter, Entry, IStates } from '../../models';
import { slideUp, scaleHeight } from '../../services/animations/animations';
import { KeypadModule } from '../../services/keypad/keypad.module';
import { NavigationService } from '../../services/navigation.service';
import { IAppFacadeState, AppFacade } from '../../store/app.facade';
import { ResultActions } from '../../store/result/result.action';
import { WaiterActions } from '../../store/waiters/waiter.action';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-calculator',
  templateUrl: 'calculator.page.html',
  styleUrls: ['calculator.page.scss'],
  standalone: true,
  imports: [
    IonAccordion,
    IonInput,
    IonAccordionGroup,
    IonDatetime,
    MenuButtonComponent,
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
    IonBadge,
    IonRow,
    IonGrid,
    IonIcon,
    IonItem,
    IonMenu,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonImg,
    IonSpinner,
    IonAvatar,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    NgxsModule,
    NgxsFormPluginModule,
    KeypadModule,
    SumPointsArrayPipe,
    TranslateModule
  ],
  providers: [
    CalculatorService,
  ],
  animations: [
    slideUp(),
    scaleHeight()
  ],
})
export class CalculatorPage implements OnInit {

  @ViewChild('accordionGroup', { static: true })
  accordionGroup!: IonAccordionGroup;

  @ViewChild('dateTimeRef', { static: false })
  dateTimeRef!: ElementRef<IonDatetime>;

  entryForm!: FormGroup;

  validationMessages = {
    tipsAmount: [
      { type: 'required', message: 'TIPS_AMOUNT_REQUIRED' }
    ],
    date: [
      { type: 'required', message: 'DATE_REQUIRED' }
    ],
  };

  dateToday = new Date().toISOString();

  selectedHours = null;

  formPath: string = 'result.entryForm';

  viewState$!: Observable<IAppFacadeState>;

  private appFacade = inject(AppFacade);
  private navigation = inject(NavigationService);
  private formBuilder = inject(FormBuilder);
  private store = inject(Store);
  private pickerController = inject(PickerController);
  private alertController = inject(AlertController);
  private calculatorService = inject(CalculatorService);

  ngOnInit(): void {
    this.viewState$ = this.appFacade.viewState$;
    this.entryForm = this.formBuilder.group({
      date: new FormControl(this.dateToday),
      tipsAmount: new FormControl(null, Validators.required),
    });
  }

  calculate(waitersList: Waiter[]) {
    let wait: any[] = [];
    waitersList.forEach((w) => {
      if (!w.hours) {
        wait.push(w.name);
      }
    });
    if (wait.length) {
      const message = `add hours for ${wait.join(', ')}`;
      this.presentAlert(message);
      return;
    }
    if (!this.entryForm.value.tipsAmount) {
      this.presentAlert('Add Tips Amount');
      return;
    }
    else {
      const teamEntry: Entry = this.calculatorService.calculateWaiterEntryObject(waitersList, this.entryForm.value.date, this.entryForm.value.tipsAmount);
      if (teamEntry) {
        this.store.dispatch(new ResultActions.SetResult(teamEntry));
        this.store.dispatch(new ResultActions.SetSelectedResult(teamEntry));
        this.navigation.navigateForward('result');
      }
    }
  }

  async presentAlert(message: any) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
    });
    await alert.present();
  }

  submitButtonState(waitersList: Waiter[]): boolean {
    let resultB = waitersList.every((el: Waiter, index: number, arr: Waiter[]) => {
      let myArray: Waiter[] = [];
      arr.forEach((waiter: any) => {
        waiter.hours;
        myArray.push(waiter.hours);
      });
      return el.hours === arr[index].hours && myArray[index] != null;
    }
    );
    return resultB;
  }

  toggleAccordion = () => {
    const nativeEl = this.accordionGroup;
    if (nativeEl.value) {
      nativeEl.value = undefined;
    }
    else {
      nativeEl.value = '';
    }
  }

  async showPicker(w: Waiter, i: number) {
    const settings: PickerOptions = {
      cssClass: 'custom-picker',
      buttons: [
        {
          text: 'Reset',
          role: 'cancel',
          handler: (e: any) => {
            this.selectedHours = null;
            const waiters: Waiter[] = this.store.selectSnapshot<any>((state: IStates) => state.waiter?.waiters);
            const waiter = new Waiter({
              id: waiters[i].id,
              name: waiters[i].name,
              pointsList: waiters[i].pointsList,
              avatar: waiters[i].avatar,
              hours: null,
            });
            this.store.dispatch(new WaiterActions.Update(waiter, waiter.id));
          }
        },
        {
          text: 'Ok',
          handler: (e: any) => {
            const hours = e.hours.value;
            const quarters = e.quarters.value;
            const hoursString: any = [`${hours}.${quarters}`];
            const hoursNumber: number = parseFloat(hoursString);
            const waiters: Waiter[] = this.store.selectSnapshot<any>((state: IStates) => state.waiter?.waiters);
            const waiter = new Waiter({
              id: waiters[i].id,
              name: waiters[i].name,
              pointsList: waiters[i].pointsList,
              avatar: waiters[i].avatar,
              hours: hoursNumber,
            });
            this.store.dispatch(new WaiterActions.Update(waiter, waiter.id));
          },
        }
      ],
      columns: [
        {
          name: 'hours',
          options: [
            {
              text: '1',
              value: 1
            },
            {
              text: '2',
              value: 2
            },
            {
              text: '3',
              value: 3
            },
            {
              text: '4',
              value: 4
            },
            {
              text: '5',
              value: 5
            },
            {
              text: '6',
              value: 6
            },
            {
              text: '7',
              value: 7
            },
            {
              text: '8',
              value: 8
            },
            {
              text: '9',
              value: 9
            },
            {
              text: '10',
              value: 10
            },
            {
              text: '11',
              value: 11
            },
            {
              text: '12',
              value: 12
            },
            {
              text: '13',
              value: 13
            },
          ]
        },
        {
          name: 'quarters',
          options: [
            {
              text: '00',
              value: 0
            },
            {
              text: '25',
              value: 25
            },
            {
              text: '50',
              value: 50
            },
            {
              text: '75',
              value: 75
            },
          ]
        }
      ],
    };

    const picker = await this.pickerController.create(settings);

    await picker.present();

  }

  onDateTimeChange() {
    this.dateTimeRef.nativeElement.confirm();
  }

  async result() {
    await this.navigation.navigateForward('result');
  }

  async home() {
    await this.navigation.navControllerDefault('home', 'back');
  }
}
