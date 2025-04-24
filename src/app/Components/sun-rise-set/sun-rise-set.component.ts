import {Component, Input} from '@angular/core';
import {WeatherData} from "../../Models/weather.interfaces";
import {SharedDataService} from "../../Services/shared-data.service";


@Component({
  selector: 'app-sun-rise-set',
  templateUrl: './sun-rise-set.component.html',
  styleUrls: ['./sun-rise-set.component.scss'],
  standalone: false
})
export class SunRiseSetComponent {
  @Input() sunrise: string = '';
  @Input() sunset: string = '';

  constructor(private sharedDataService: SharedDataService) {
  }

  ngOnInit() {
    this.sharedDataService.currentLandData$.subscribe(data => {
      if (data?.land?.weather?.daily) {
        this.sunrise = data.land.weather.daily.sunrise[0];
        this.sunset = data.land.weather.daily.sunset[0];
      }
    });
  }
}
