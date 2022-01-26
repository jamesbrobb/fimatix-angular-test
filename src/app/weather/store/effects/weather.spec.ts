import {ActionsSubject} from "@ngrx/store";
import {GetWeatherEffect} from "./weather";
import {WeatherService} from "../../weather.service";
import mockData from '../../../../mock/weather.json';
import {Observable, of, throwError} from "rxjs";
import {Weather} from "../../../model/weather";
import {
    searchError,
    searchRequest, searchResult,
    WEATHER_SEARCH_ERROR,
    WEATHER_SEARCH_RESULT
} from "../actions/weather";


class MockWeatherService implements Pick<WeatherService, 'searchWeatherForCity'> {

    constructor(private _shouldError: boolean = false) {}

    searchWeatherForCity(city: string): Observable<Weather> {
        if(this._shouldError) {
            return throwError({error:{message: '404'}})
        }
        return of(mockData.weather[0])
    }
}

type searchResultType = ReturnType<typeof searchResult>
type searchErrorType = ReturnType<typeof searchError>


describe('GetWeatherEffect', () => {

    it('should dispatch an action on success', () => {

        const mock = new MockWeatherService() as any,
            actions = new ActionsSubject(),
            effect = new GetWeatherEffect(actions, mock);

        let result: searchResultType;

        effect.getWeather$.subscribe((action: searchResultType) => {
            result = action;
        });

        actions.next(searchRequest({city: 'London'}));

        expect(result.type).toEqual(WEATHER_SEARCH_RESULT);
        expect(result.result).toEqual(mockData.weather[0]);
    });

    it('should dispatch an action on failure', () => {

        const mock = new MockWeatherService(true) as any,
            actions = new ActionsSubject(),
            effect = new GetWeatherEffect(actions, mock);

        let result: searchErrorType;

        effect.getWeather$.subscribe((action: searchErrorType) => {
            result = action;
        });

        actions.next(searchRequest({city: 'sldkfjsj'}));

        expect(result.type).toEqual(WEATHER_SEARCH_ERROR);
        expect(result.error).toEqual('404');
    });
});
