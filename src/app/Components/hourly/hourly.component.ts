import {Component} from '@angular/core';
import { WeatherData } from "../../Models/weather.interfaces";
import {SharedDataService} from "../../Services/shared-data.service";


@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.scss'],
  standalone: false
})
export class HourlyComponent   {
  weatherData: WeatherData | null = null;
  hourlyData: any[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.sharedDataService.currentLandData$.subscribe(data => {
      if (data) {
        this.weatherData = data.land.weather;
        this.processHourlyData();
      }
    });
  }

  processHourlyData() {
    if (!this.weatherData?.hourly) return;

    this.hourlyData = [];

    for (let i = 0; i < 24; i++) {
      const time = new Date(this.weatherData.hourly.time[i]);

      this.hourlyData.push({
        time: this.formatTime(time),
        temperature: this.weatherData.hourly.temperature_2m[i],
        precipitation: this.weatherData.hourly.precipitation_probability[i],
        isDay: this.weatherData.hourly.is_day[i] === 1
      });
      this.getWeatherIconName(i);
      this.getWeatherIconClass(i);
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getWeatherIconName(i: number) {
    if (!this.weatherData) return 'sunny';

    const isDay = this.weatherData.hourly.is_day[i];
    const currentPrecipitation = this.weatherData.hourly.precipitation_probability;
    const currentCloudy = this.weatherData.hourly.cloud_cover;
    let iconName = '';
    if (currentPrecipitation[i] >= 10) return 'rainy';
    else if (currentPrecipitation[i] < 10 && currentCloudy[i] < 20) iconName = isDay ? 'sunny' : 'moon';
    else if (currentPrecipitation[i] < 10 && currentCloudy[i] >= 20 && currentCloudy[i] < 60) iconName = isDay ? 'partly-sunny' : 'cloudy-night';
    else if (currentPrecipitation[i] < 10 && currentCloudy[i] >= 60) iconName = 'cloudy';
    return iconName;
  }

  getWeatherIconClass(i: number) {
    if (!this.weatherData) return 'yellow-icon';

    const isDay = this.weatherData.hourly.is_day[i];
    let iconClass = '';
    const iconName = this.getWeatherIconName(i);
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
}
