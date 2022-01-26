import {createAction, props} from "@ngrx/store";
import {Weather} from "../../../model/weather";


export const WEATHER_SEARCH = '[WEATHER] search';
export const WEATHER_SEARCH_RESULT = '[WEATHER] search result';
export const WEATHER_SEARCH_ERROR = '[WEATHER] search error';


export const searchRequest = createAction(
    WEATHER_SEARCH,
    props<{city: string}>()
)

export const searchResult = createAction(
    WEATHER_SEARCH_RESULT,
    props<{result: Weather}>()
)

export const searchError = createAction(
    WEATHER_SEARCH_ERROR,
    props<{error: string}>()
)
