import {ResultsComponent} from "./results.component";
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import mockData from '../../../../mock/weather.json';


describe('ResultsComponent', () => {
    let component: ResultsComponent,
        fixture: ComponentFixture<ResultsComponent>,
        element: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ResultsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct number of cities', () => {

        const data = mockData.weather;

        component.ioCities = data;
        component.ngOnChanges();

        fixture.detectChanges();

        const rows: DebugElement[] = fixture.debugElement.queryAll(By.css('tbody > tr'));

        expect(rows.length).toEqual(data.length);
    });
})
