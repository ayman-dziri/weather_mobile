import {Component} from '@angular/core';
import {WeatherData} from "../../Models/weather.interfaces";
import {SharedDataService} from "../../Services/shared-data.service";
import {ModalController} from "@ionic/angular";
import {NotificationModalComponent} from "../notification-modal/notification-modal.component";

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
  standalone: false
})
export class CurrentComponent {
  weatherData: WeatherData | null = null;
  landName: string = 'your land';
  farmName: string = '';

  error: string | null = null;
  notification: number = 0;
  constructor(private sharedDataService: SharedDataService, private modalCtrl: ModalController) { }


  get windSpeedDisplay(): string {
    if (!this.weatherData || !this.weatherData.current) return '-- km/h';
    return `${this.weatherData.current.wind_speed_10m} km/h`;
  }
  get temperatureDisplay(): string {
    if (!this.weatherData || !this.weatherData.current) return '--°';
    return `${this.weatherData.current.temperature_2m}°`;
  }
  get apparentTemp(): string {
    if (!this.weatherData || !this.weatherData.current) return '--°';
    return `${this.weatherData.current.apparent_temperature}°`;
  }

  ngOnInit() {
    this.sharedDataService.currentLandData$.subscribe({
      next: (data) => {
        if (data) {
          this.weatherData = data.land.weather;
          this.landName = data.land.name;
          this.farmName = data.farm.name;
        }
      },
    });
  }

  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  getWeatherIconName() {
    if (!this.weatherData) return 'sunny';

    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;
    const currentPrecipitation = this.weatherData.current.precipitation;
    const currentCloudy = this.weatherData.current.cloud_cover;
    let iconName = '';
    if(currentPrecipitation >= 10) return 'rainy';
    else if(currentPrecipitation < 10 && currentCloudy < 20) iconName = isDay ? 'sunny' : 'moon';
    else if(currentPrecipitation < 10 && currentCloudy >= 20 && currentCloudy < 60) iconName = isDay ? 'partly-sunny' : 'cloudy-night';
    else if(currentPrecipitation < 10 && currentCloudy >= 60) iconName = 'cloudy';
    return iconName;
  }
  getWeatherIconClass() {
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;
    const iconName = this.getWeatherIconName();
    let iconClass = '';
    if (iconName === 'sunny') iconClass = 'yellow-icon';
    else if (iconName === 'moon') iconClass = 'moon-icon';
    else if (iconName === 'cloudy-night') iconClass = 'moon-icon';
    else if (iconName === 'partly-sunny') iconClass = 'yellow-icon';
    else if (iconName === 'rainy' && isDay) iconClass = 'yellow-icon';
    else if (iconName === 'rainy' && !isDay) iconClass = 'moon-icon';
    else if (iconName === 'cloudy' && isDay) iconClass = 'yellow-icon';
    else if (iconName === 'cloudy' && !isDay) iconClass = 'moon-icon';
    return iconClass;
  }

  async onNotificationClick() {
    this.notification++;
    const modal = await this.modalCtrl.create({
      component: NotificationModalComponent,
      componentProps: {
        message: 'Tomatoes cannot survive at temperatures as low as -23.5 °C, so it\'s crucial to move them indoors or into a greenhouse if possible. Ensure they have adequate warmth, ideally above 10 °C, and monitor humidity levels, as low humidity can cause stress. Avoid watering directly under the freezing conditions to prevent root damage; instead, focus on maintaining a warm environment. If not possible to protect them, consider restarting with seeds once temperatures rise'
      },
      cssClass: 'notification-modal',
      backdropDismiss: true
    });
    await modal.present();
  }
}
