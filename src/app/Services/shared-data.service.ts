import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Farm, Land} from "../Models/weather.interfaces";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public activeComponent: string = 'current';

  private activeComponentSource = new BehaviorSubject<string>(this.activeComponent);
  activeComponent$ = this.activeComponentSource.asObservable();

  setActiveComponent(component: string) {
    this.activeComponent = component;
    this.activeComponentSource.next(component);
  }

  private currentLandSource = new BehaviorSubject<{
    farm: Farm;
    land: Land;
    landIndex: number;
  } | null>(null);

  currentLandData$ = this.currentLandSource.asObservable();

  setCurrentLand(farm: Farm, landIndex: number = 0) {
    if (farm?.lands?.length > 0) {
      this.currentLandSource.next({
        farm: farm,
        land: farm.lands[landIndex],
        landIndex: landIndex
      });
    }
  }

  navigateToLand(offset: number) {
    const current = this.currentLandSource.value;
    if (!current || !current.farm?.lands) return;

    const newIndex = current.landIndex + offset;

    if (newIndex >= 0 && newIndex < current.farm.lands.length) {
      this.currentLandSource.next({
        farm: current.farm,
        land: current.farm.lands[newIndex],
        landIndex: newIndex
      });
      console.log(`Navigated to land index: ${newIndex}`);
    }
  }
}
