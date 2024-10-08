import { Component, Input, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
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
  IonFab, 
  IonFabButton
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { SelectedEntryCardComponent } from '../../selected-entry-card/selected-entry-card.component';
import { Entry } from '../../../models';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details.modal.html',
  styleUrls: ['./details.modal.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonFab,
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
    CommonModule,
    NgxsModule,
    NgxsFormPluginModule,
    SelectedEntryCardComponent
  ],
})
export class DetailsModal {

  @Input() entry!: Entry;

  readonly sanitizer = inject(DomSanitizer);

  public modalController = inject(ModalController);

  private downloadService = inject(DownloadService);

  dismiss() {
    this.modalController.dismiss();
  }

  async shareContent() {
    this.downloadService.shareEntry(this.entry);
  }

}
