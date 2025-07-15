import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Vetcalc',
  webDir: 'www',
  android: {
    signing: {
      "keystorePath": "vetcalcbr.jks",
      "keystorePassword": "vetcalcbr",
      "keystoreKeyAlias": "vetcalc",
      "keystoreKeyPassword": "Sp1ce7re*"
    }
  }
};

export default config;
