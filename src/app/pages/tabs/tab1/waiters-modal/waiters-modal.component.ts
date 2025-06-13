import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
} from '@ionic/angular/standalone';
import { ModalController, ActionSheetController } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule, UpdateFormValue } from '@ngxs/form-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { ComponentsModule } from 'src/app/components/components.module';
import { Waiter } from 'src/app/models';
import { slideUp, scaleHeight } from 'src/app/services/animations/animations';
import { KeypadModule } from 'src/app/services/keypad/keypad.module';
import { generateId } from 'src/app/services/utils';
import { WaiterActions } from 'src/app/store/waiters/waiter.action';

@Component({
  selector: 'app-waiters-modal',
  templateUrl: './waiters-modal.component.html',
  styleUrls: ['./waiters-modal.component.scss'],
  standalone: true,
  imports: [
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
export class WaitersModalComponent implements OnInit {

  @Input()
  waiter!: Waiter;

  createWaiterForm!: FormGroup;

  waiterId!: number;

  isEdit: any = null;

  avatar: string = '';

  formPath: string = 'waiter.createWaiterForm';

  constructor(
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    private titleCasePipe: TitleCasePipe,
    private store: Store
  ) {
    this.createWaiterForm = new FormGroup({
      name: new FormControl(null),
      avatar: new FormControl(null),
    });
  }

  ngOnInit() {
    this.isEdit = !this.waiter ? false : true;
    if (this.waiter) {
      this.fillForm(this.waiter.name, this.waiter.avatar)
      this.waiterId = this.waiter.id;
      this.avatar = this.waiter.avatar;
    }
  }

  async addNewWaiter() {
    const newWaiter = new Waiter({
      id: generateId(),
      name: this.titleCasePipe.transform(this.createWaiterForm.value.name),
      avatar: this.avatar ? this.avatar : null,
    });
    if (this.createWaiterForm.valid) {
      this.store.dispatch(new WaiterActions.AddWaiter(newWaiter));
      this.modalController.dismiss(newWaiter);
      this.clearForm();
    }
  }

  saveEditedWaiter() {
    const editedWaiter = new Waiter({
      id: this.waiterId,
      name: this.titleCasePipe.transform(this.createWaiterForm.value.name),
      avatar: this.avatar ? this.avatar : null,
      pointsList: this.waiter.pointsList
    });
    if (this.createWaiterForm.valid) {
      this.store.dispatch(new WaiterActions.Update(editedWaiter, editedWaiter.id));
      this.modalController.dismiss();
      this.clearForm();
    }
  }

  async onImagePicked(imageData: string) {
    this.createWaiterForm.get('avatar')?.setValue(imageData);
    this.avatar = imageData;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  fillForm(name: string, avatar: string) {
    this.store.dispatch([
      new UpdateFormValue({
        path: this.formPath,
        value: {
          name,
          avatar,
        },
      }),
    ]);
  }

  clearForm() {
    this.store.dispatch([
      new UpdateFormValue({
        path: this.formPath,
        value: {
          name: null,
          avatar: null,
        },
      }),
    ]);
  }

}
