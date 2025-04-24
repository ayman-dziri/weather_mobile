import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'weather_mobile',
  webDir: 'www',
  server: {
    cleartext: true
  }
};

export default config;
