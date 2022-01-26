import {createReducer, on} from "@ngrx/store";
import {initialState, WeatherState} from "../state/state";
import {searchResult} from "../actions/weather";
import {Weather} from "../../../model/weather";


export const weatherReducer = createReducer(
    initialState,
    on(searchResult, (state: WeatherState, { result }) => {
        return state.filter((weather: Weather) => {
            return weather.city.name !== result.city.name && weather.city.country !== result.city.country
        })
        .concat(result);
    })
);
