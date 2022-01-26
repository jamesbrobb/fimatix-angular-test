import {WeatherSearch} from "../pages/weather-search";


describe('Weather', () => {

  const LONDON = 'London';
  const TEXAS = 'Texas';
  const PARIS = 'Paris';

  const INVALID_CITY = 'sjdhfskjh';

  let page: WeatherSearch;

  beforeEach(() => {
    page = new WeatherSearch();
    page.visit();
  })

  describe('valid search request', () => {

    it('should add a city to the results list', () => {

      page.searchForCity(LONDON);
      page.shouldHaveResultCountOf(1);
      page.shouldDisplayResultsForCities([LONDON]);
    });
  });

  describe('invalid search request', () => {

    it('should not add a city to the results list', () => {
      page.searchForCity(INVALID_CITY);
      page.shouldHaveResultCountOf(0);
    });
  });

  describe('duplicate search request', () => {

    it('should only show one result per city', () => {

      page.searchForCity(LONDON);
      page.shouldHaveResultCountOf(1);
      page.shouldDisplayResultsForCities([LONDON]);

      page.searchForCity(LONDON);
      page.shouldHaveResultCountOf(1);
      page.shouldDisplayResultsForCities([LONDON]);
    });
  });

  describe('consecutive search requests', () => {

    it('should display multiple results in the correct order', () => {

      page.searchForCity(LONDON);
      page.shouldHaveResultCountOf(1);
      page.shouldDisplayResultsForCities([LONDON]);

      page.searchForCity(TEXAS);
      page.shouldHaveResultCountOf(2);
      page.shouldDisplayResultsForCities([LONDON, TEXAS]);

      page.searchForCity(PARIS);
      page.shouldHaveResultCountOf(3);
      page.shouldDisplayResultsForCities([LONDON, TEXAS, PARIS]);
    });
  })
})
