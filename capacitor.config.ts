import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'co.tips.share',
  appName: 'Tips Share',
  webDir: 'www',
  "plugins": {
    "Keyboard": {
      "resize": KeyboardResize.Body,
      "style": KeyboardStyle.Default,
      "resizeOnFullScreen": true
    },
    "SplashScreen": {
      "launchShowDuration": 3000,
    }
  },
  android: {
    webContentsDebuggingEnabled: true,
    loggingBehavior: 'debug',
    buildOptions: {
      keystorePath: '/Users/ricardobento/Local-documents/Goiaba/Calculator Assets/Certificates/tips-calculator',
      keystorePassword: 'Rwbento123!',
      keystoreAlias: 'tips-calculator-alias',
      keystoreAliasPassword: 'Rwbento123!',
      releaseType: 'AAB'
    }
  },
  ios: {
    webContentsDebuggingEnabled: true,
    loggingBehavior: 'debug',
    scrollEnabled: false,
    path: 'ios',
    scheme: 'App'
  },
};

export default config;
