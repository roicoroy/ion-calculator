import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language/language.service';
import { Store } from '@ngxs/store';
import { LanguageActions } from '../../store/language/language.actions';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss'],
})
export class TranslateComponent implements OnInit, OnDestroy {
  profile: any;

  translations: any;

  private readonly ngUnsubscribe = new Subject();

  public translate = inject(TranslateService);
  private languageService = inject(LanguageService);
  private alertController = inject(AlertController);
  private store = inject(Store);

  ngOnInit(): void {
    this.translate.getTranslation(this.translate.currentLang)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((translations) => {
        this.translations = translations;
      });
  }

  async openLanguageChooser() {
    const availableLanguages = this.languageService.getLanguages()
      .map((item: any) => ({
        name: item.name,
        type: 'radio',
        label: this.translate.instant(item.name),
        value: item.code,
        checked: item.code === this.translate.currentLang
      })
      );

    const alert = await this.alertController.create({
      header: this.translate.instant(this.translations.SELECT_LANGUAGE),
      inputs: availableLanguages,
      cssClass: 'language-alert',
      buttons: [
        {
          text: this.translate.instant(this.translations.CANCEL),
          role: 'cancel',
          cssClass: 'translate-alert',
          handler: () => { }
        },
        {
          text: this.translate.instant(this.translations.OK),
          handler: (data) => {
            if (data) {
              this.translate.use(data);
              this.store.dispatch(new LanguageActions.SetLanguage(data))
            }
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
