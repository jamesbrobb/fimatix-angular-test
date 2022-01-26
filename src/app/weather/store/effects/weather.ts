import {Injectable} from "@angular/core";
import {catchError, map, mergeMap} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {WeatherService} from "../../weather.service";
import {
    searchRequest,
    WEATHER_SEARCH_ERROR,
    WEATHER_SEARCH_RESULT
} from "../actions/weather";
import {Weather} from "../../../model/weather";
import {of} from "rxjs";



@Injectable()
export class GetWeatherEffect {
    constructor(
        private _actions$: Actions,
        private _weatherService: WeatherService
    ) {}

    getWeather$ = createEffect(() =>
        this._actions$.pipe(
            ofType(searchRequest),
            mergeMap(({city}) => {
                    return this._weatherService.searchWeatherForCity(city)
                        .pipe(
                            map((data: Weather) => ({type: WEATHER_SEARCH_RESULT, result: data})),
                            catchError(({error}) => of({type: WEATHER_SEARCH_ERROR, error: error.message})
                            )
                        )
                }
            )
        )
    );
}
