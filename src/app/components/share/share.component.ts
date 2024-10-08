import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonToggle, IonFab, IonFabButton} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab,
    IonButton,
    IonIcon,
    IonToggle,
    CommonModule
  ]
})
export class ShareComponent {

  private downloadService = inject(DownloadService);

  async shareContent() {
    this.downloadService.shareFullResultList();
  }
}

