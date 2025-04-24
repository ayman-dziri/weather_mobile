import {Component} from '@angular/core';
import {SharedDataService} from "../../Services/shared-data.service";
import {WeatherData} from "../../Models/weather.interfaces";

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
  standalone: false
})
export class DailyComponent   {
  weatherData: WeatherData | null = null;
  dailyForecasts: any[] = [];
  error: string | null = null;
  notification: number = 0;

  // Tableau des jours de la semaine
  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.sharedDataService.currentLandData$.subscribe(data => {
      if (data) {
        this.weatherData = data.land.weather;
        this.processDailyData();
      }
    });
  }

  processDailyData() {
    if (!this.weatherData?.daily) return;

    this.dailyForecasts = [];

    for (let i = 0; i < this.weatherData.daily.time.length; i++) {
      const date = new Date(this.weatherData.daily.time[i]);
      const dayName = this.weekDays[date.getDay()];

      this.dailyForecasts.push({
        dayName: dayName,
        date: date,
        precipitation: this.weatherData.daily.precipitation_sum[i],
        tempMax: this.weatherData.daily.temperature_2m_max[i],
        tempMin: this.weatherData.daily.temperature_2m_min[i],
        sunrise: this.weatherData.daily.sunrise,
        sunset: this.weatherData.daily.sunset
      });
    }
  }


  onNotificationClick() {
    this.notification++;
  }
}
