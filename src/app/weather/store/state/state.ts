import {Weather} from "../../../model/weather";


export interface AppState {
    weather: Weather[]
}

export type WeatherState = Weather[];

export const initialState: WeatherState = [];
