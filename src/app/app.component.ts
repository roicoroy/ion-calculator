import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane, Platform } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { KeyboardService } from './services/keypad/keyboard.service';
import { LanguageService } from './services/language/language.service';
import { ThemeService } from './services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { IconsService } from './services/icons.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  standalone: true,
  imports: [
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonApp,
    IonRouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    RouterModule
],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Waiters', url: '/tabs/tab1', icon: 'restaurant' },
    { title: 'Points', url: '/tabs/tab2', icon: 'options' },
    { title: 'Settings', url: '/tabs/tab3', icon: 'cog' },
    { title: 'Saved Entries', url: '/saved-entries', icon: 'receipt' },
  ];

  title = 'calculator';

  private icons = inject(IconsService);

  private language = inject(LanguageService);

  private theme = inject(ThemeService);

  private keyboardService = inject(KeyboardService);

  private platform = inject(Platform);

  public translate = inject(TranslateService);

  async ngOnInit(): Promise<void> {
    await this.initializeApp()
  }

  async initializeApp() {
    try {
      this.icons.initIcons();
      this.theme.themeInit();
      this.language.initTranslate();
      if (this.platform.is('capacitor')) {
        await this.keyboardService.setAccessoryBarVisible(true).catch(() => { });
        await this.keyboardService.initKeyboardListeners();
        await SplashScreen.hide();
      }
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }

}
