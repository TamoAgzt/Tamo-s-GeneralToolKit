import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'eu.torngems.nerdtoolkit',
  appName: 'NerdToolKit',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    Geolocation: {
      forceShow: true,
    },
  },
};

export default config;
