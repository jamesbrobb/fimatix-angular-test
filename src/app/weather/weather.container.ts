import { Component } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {searchRequest} from "./store/actions/weather";
import {weatherResults} from "./store/selectors/weather";


@Component({
  selector: 'app-weather',
  template: `
    <app-search (onsearch)="citySearch($event)"></app-search>
    <app-results [cities]="citys$ | async"></app-results>
  `
})
export class WeatherContainer {

  citys$ = this._store.pipe(select(weatherResults));

  constructor(
    private readonly _store: Store
  ) {}

  citySearch(city: string) {
    this._store.dispatch(searchRequest({city}));
  }
}
