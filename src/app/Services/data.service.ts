import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {WeatherResponse} from "../Models/weather.interfaces";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://192.168.1.24:8080/weather-all-cache';

  constructor(private http: HttpClient) { }

  getWeatherData(): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erreur API:', error);
        return throwError(() => new Error('Erreur lors de la récupération des données météo'));
      })
    );
  }
}
