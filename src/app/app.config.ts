import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading } from '@angular/router';
import { appRoutes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IMAGE_CONFIG } from '@angular/common';
// Swiper
import { register } from 'swiper/element/bundle';
register();
//
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { KeyboardState } from './store/keyboard/keyboard.state';
import { LanguageState } from './store/language/language.state';
import { MenuState } from './store/menu/menu.state';
import { PointsState } from './store/points/point.state';
import { ResultState } from './store/result/result.state';
import { ThemeState } from './store/theme/theme.state';
import { TutorialState } from './store/tutorial/tutorial.state';
import { WaitersState } from './store/waiters/waiter.state';
defineCustomElements(window);
// 
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// 
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      // https://angular.io/guide/image-directive
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideIonicAngular({
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        },
        defaultLanguage: 'en'
      }),
      NgxsModule.forRoot([
        PointsState,
        WaitersState,
        LanguageState,
        ResultState,
        KeyboardState,
        TutorialState,
        ThemeState,
        MenuState
      ]),
      NgxsReduxDevtoolsPluginModule.forRoot({ disabled: false }),
      NgxsLoggerPluginModule.forRoot({ disabled: true }),
      NgxsStoragePluginModule.forRoot({
        keys: [
          'language',
          'point',
          'waiter',
          'result',
          'tutorial',
          'theme',
        ]
      }),
      NgxsFormPluginModule.forRoot(),
    ),
  ],
};
