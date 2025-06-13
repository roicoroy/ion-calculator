import { Component, inject } from '@angular/core';
import { MenuController } from '@ionic/angular/standalone';
import {
  IonMenuButton,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
  standalone: true,
  imports: [
    IonMenuButton,
    IonIcon
  ]
})
export class MenuButtonComponent {

  private menu = inject(MenuController);

  toogleMenu() {
    this.menu.toggle('right-menu')
  }
}
