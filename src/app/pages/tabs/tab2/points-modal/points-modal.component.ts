import { CommonModule, TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, NgForm, Validators } from '@angular/forms';
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
  IonHeader,
  IonBadge,
  IonSelectOption,
  IonSelect
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule, UpdateFormValue } from '@ngxs/form-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { ComponentsModule } from 'src/app/components/components.module';
import { Point } from 'src/app/models';
import { slideUp, scaleHeight } from 'src/app/services/animations/animations';
import { KeypadModule } from 'src/app/services/keypad/keypad.module';
import { generateId, titleCaseWord, numberize } from 'src/app/services/utils';
import { PointActions } from 'src/app/store/points/point.action';

@Component({
  selector: 'app-points-modal',
  templateUrl: './points-modal.component.html',
  styleUrls: ['./points-modal.component.scss'],
  standalone: true,
  imports: [
    IonSelectOption,
    IonSelect,
    IonBadge,
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
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    NgxsModule,
    NgxsFormPluginModule,
    KeypadModule,
    TranslateModule
  ],
  providers: [TitleCasePipe],
  animations: [
    slideUp(),
    scaleHeight()
  ],
})
export class PointsModalComponent implements OnInit {

  @ViewChild('createPointFormRef', { static: false }) createPointFormRef!: NgForm;

  @ViewChild('selectRef', { static: false }) selectRef!: ElementRef;

  @Input()
  point!: Point;

  values = [
    {
      value: 0.5,
    },
    {
      value: 1,
    },
    {
      value: 1.5,
    },
    {
      value: 2.0,
    },
  ];

  formPath: string = 'points.createPointsForm';

  createPointsForm!: FormGroup;

  pointData!: Point;

  pointId: any;

  isEdit: any = null;

  constructor(
    public modalController: ModalController,
    private store: Store
  ) {
    this.createPointsForm = new FormGroup({
      label: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
    });
  }

  get labelFormControl() {
    return this.createPointsForm?.get('label') as FormControl;
  }

  get valueFormControl() {
    return this.createPointsForm?.get('value') as FormControl;
  }

  ngOnInit() {
    this.isEdit = !this.point ? false : true;
    if (this.point) {
      this.pointId = this.point.id;
    }
  }

  addNewPoint() {
    const newPoint = new Point({
      id: generateId(),
      label: titleCaseWord(this.createPointsForm.value.label),
      value: numberize(this.valueFormControl.value),
      type: 'checkbox'
    })
    if (this.createPointsForm.valid) {
      this.store.dispatch(new PointActions.AddPoint(newPoint));
      this.modalController.dismiss();
      this.cleatForm();
    }
  }

  saveEditedPoint() {
    const editPoint = new Point({
      id: this.pointId,
      label: titleCaseWord(this.createPointsForm.value.label),
      value: numberize(this.valueFormControl.value),
      type: 'checkbox'
    });
    if (this.createPointsForm.valid) {
      this.store.dispatch(new PointActions.UpdatePoint(editPoint, editPoint.id));
      this.modalController.dismiss();
      this.cleatForm();
    }
  }

  fillForm(label: string, value: any) {
    this.store.dispatch([
      new UpdateFormValue({
        path: this.formPath,
        value: {
          label,
          value,
        },
      }),
    ]);
  }

  cleatForm() {
    this.store.dispatch([
      new UpdateFormValue({
        path: this.formPath,
        value: {
          label: null,
          value: null,
        },
      }),
    ]);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
