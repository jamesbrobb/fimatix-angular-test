import {weatherReducer} from "./weather";
import {WEATHER_SEARCH_RESULT} from "../actions/weather";
import mockData from '../../../../mock/weather.json';
import {initialState} from "../state/state";

describe('weatherReducer', () => {

    it('should set the value of weather', () => {
        const action = {type: WEATHER_SEARCH_RESULT, result: mockData.weather[0]};
        const result = weatherReducer(initialState, action);
        expect(result.length).toEqual(1);
    });

    it('should replace duplicates with newest result for city', () => {
        const weather = Object.assign({}, mockData.weather)[0];
        weather.list[2].main.temp = 55;

        const action = {type: WEATHER_SEARCH_RESULT, result: weather};
        const result = weatherReducer(mockData.weather, action);

        expect(result.length).toEqual(4);
        expect(result[result.length - 1].city.name).toEqual('London');
        expect(result[result.length - 1].list[2].main.temp).toEqual(55);
    });
})
