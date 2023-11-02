import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'eu.torngems.generaltoolkit',
  appName: "Tamo's GeneralToolKit",
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
