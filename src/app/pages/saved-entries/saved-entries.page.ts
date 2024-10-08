import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  IonFabButton,
  IonFab,
  IonMenuToggle
} from '@ionic/angular/standalone';
import { ComponentsModule } from '../../components/components.module';
import { MenuButtonComponent } from '../../components/menu-button/menu-button.component';
import { NavigationService } from '../../services/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { ShareComponent } from 'src/app/components/share/share.component';

@Component({
  selector: 'app-saved-entries',
  templateUrl: 'saved-entries.page.html',
  styleUrls: ['saved-entries.page.scss'],
  standalone: true,
  imports: [
    IonMenuToggle,
    ShareComponent,
    IonFab,
    IonFabButton,
    IonIcon,
    MenuButtonComponent,
    IonButton,
    IonText,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle, IonContent,
    CommonModule,
    IonMenuButton,
    ComponentsModule,
    IonFooter,
    IonCol,
    IonRow,
    IonGrid,
    TranslateModule
  ],
})
export class SavedEntriesPage {
  isOpen = false;

  pages = new Array(10);

  title = 'Saved Entries'

  private navigation = inject(NavigationService);

  async back() {
    await this.navigation.navControllerDefault('home', 'back');
  }

}
