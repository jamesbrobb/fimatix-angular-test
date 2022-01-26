import {createSelector} from "@ngrx/store";
import {AppState} from "../state/state";
import {Weather} from "../../../model/weather";


const weatherSelector = (state: AppState) => state.weather;

export const weatherResults = createSelector(
    weatherSelector,
    (weather: Weather[]) => weather
)
