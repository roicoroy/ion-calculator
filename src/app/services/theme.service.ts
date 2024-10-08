import { inject, Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngxs/store';
import { IStates } from '../models';
import { ThemeActions } from '../store/theme/theme.action';
export const DARK_MODE = 'dark_mode';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public darkMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public darkModeIcon: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private store = inject(Store);

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }

  themeInit() {
    const isDarkMode = this.store.selectSnapshot<any>((state: IStates) => state.theme.isDarkMode);
    if (isDarkMode) {
      this.document.body.classList.toggle('dark', true);
      this.darkMode.next(true);
      this.darkModeIcon.next('moon');
    } else {
      this.document.body.classList.toggle('dark', false);
      this.darkMode.next(false);
      this.darkModeIcon.next('sunny');
    }
  }

  changeTheme(ev: any) {
    this.store.dispatch(new ThemeActions.SetDarkMode(ev.detail.checked));
    this.themeInit()
  }

}
