import * as cypress from "cypress";


export class WeatherSearch {

    public visit(): void {
        cy.visit('/');
    }

    public searchForCity(city: string): void {
        cy.get('app-search #city').first().clear().type(city);
        cy.get('app-search button[type="submit"]').first().click();
    }

    public shouldHaveResultCountOf(count: number): void {
        cy.get('app-results tbody').find('tr').should('have.length', count);
    }

    public shouldDisplayResultsForCities(cities: string[]): void {
        cy.get('app-results tbody tr').each((element, index, list) => {
            cy.wrap(element).find('td').first().should('have.text', cities[index]);
            expect(list).to.have.length(cities.length);
        });
    }
}
