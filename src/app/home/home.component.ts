import { Component } from '@angular/core';
import {SharedDataService} from "../Services/shared-data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent   {

  isFirstLand = true;
  isLastLand = false;
  activeComponent = 'current';

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {

    this.sharedDataService.currentLandData$.subscribe(data => {
      if (data) {
        this.isFirstLand = data.landIndex === 0;
        this.isLastLand = data.landIndex === data.farm.lands.length - 1;
      }
    });


    this.sharedDataService.activeComponent$.subscribe(component => {
      this.activeComponent = component;
      this.scrollToComponent(component);
    });
  }

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }


  scrollToComponent(componentId: string) {
    setTimeout(() => {
      const element = document.getElementById(componentId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  }

  previousLand() {
    this.sharedDataService.navigateToLand(-1);
  }

  nextLand() {
    this.sharedDataService.navigateToLand(1);
  }

}
