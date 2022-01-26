import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { WeatherContainer } from './weather.container';
import mockData from '../../mock/weather.json';
import Spy = jasmine.Spy;
import {searchRequest} from "./store/actions/weather";



describe('WeatherContainer', () => {
  let component: WeatherContainer,
      fixture: ComponentFixture<WeatherContainer>,
      spy: Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherContainer],
      imports: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({
          initialState: { weather: mockData.weather}
        }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    const store = TestBed.inject(MockStore);
    spy = spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a search request action', () => {
    const city = 'London';
    component.citySearch(city);
    expect(spy).toHaveBeenCalledWith(searchRequest({city}));
  });
});
