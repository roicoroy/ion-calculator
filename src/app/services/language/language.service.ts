import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageModel } from './language.model';
import { Store } from '@ngxs/store';
import { LanguageActions } from '../../store/language/language.actions';
import { IStates } from '../../models';

export const SAVED_LANGUAGE = 'saved_language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languages: Array<LanguageModel> = new Array<LanguageModel>();

  private translate = inject(TranslateService);
  
  private store = inject(Store);

  getLanguages(): any {
    this.languages = [];
    this.languages.push(
      { name: 'ENGLISH', code: 'en' },
      { name: 'PORTUGUESE', code: 'pt' },
    );
    return this.languages;
  }

  async initTranslate() {
    const savedLangage = this.store.selectSnapshot<any>((state: IStates) => state.language);    
    if(!savedLangage.language){
      this.translate.use(this.translate.defaultLang);
      this.store.dispatch(new LanguageActions.SetLanguage(this.translate.defaultLang));
    } else {
      this.translate.use(savedLangage.language);
    }
  }
  
  shortLanguage(language: any) {
    if (language) {
      const short = language.value.split('-');
      return short[0];
    }
  }
}
