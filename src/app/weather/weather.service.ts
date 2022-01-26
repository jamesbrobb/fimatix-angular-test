import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Weather} from "../model/weather";


@Injectable()
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/forecast';
  params = {
    q: '',
    cnt: '9',
    units: 'metric',
    APPID: '010721642521f31b0fbc8c3831d45951'
  };

  constructor(private _http: HttpClient) { }

  searchWeatherForCity(city: string): Observable<Weather> {
    return this._http.get(this.url, {params: {...this.params, q:city}});
  }
}
