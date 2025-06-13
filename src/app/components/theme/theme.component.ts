import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IonButton,
  IonIcon,
  IonToggle, IonCol, IonText } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  standalone: true,
  imports: [IonText, IonCol, 
    IonButton,
    IonIcon,
    IonToggle,
    CommonModule
  ]
})
export class ThemeComponent implements OnInit {
  
  appDarkMode$!: Observable<boolean>;
  
  appDarkModeIcon$!: Observable<string>;

  private theme = inject(ThemeService);
  
  ngOnInit() {
    this.appDarkMode$ = this.theme.darkMode;
    this.appDarkModeIcon$ = this.theme.darkModeIcon;
  }
  
  onChangeTheme(theme: any) {
    this.theme.changeTheme(theme);
  }

}
