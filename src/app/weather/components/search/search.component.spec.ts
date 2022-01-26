import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import { SearchComponent } from './search.component';
import {FormsModule, NgForm} from "@angular/forms";
import {first} from "rxjs/operators";
import {By} from "@angular/platform-browser";
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;

describe('SearchComponent', () => {
  let component: SearchComponent,
      fixture: ComponentFixture<SearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('search submission', () => {

    let value: string,
        result: string,
        form: DebugElement,
        ngForm: NgForm,
        spy: Spy;

    beforeEach(() => {
      result = undefined;
      form = fixture.debugElement.query(By.css('form'));
      ngForm = form.injector.get(NgForm);
      spy = createSpy();

      component.onsearch.pipe(first()).subscribe((arg: string) => {
        result = arg
        spy();
      });
    })

    it('should emit a search value', waitForAsync(() => {

      value = 'London'

      fixture.whenStable().then(() => {
        ngForm.form.setValue({city: value})
        form.triggerEventHandler('submit', null);
        expect(result).toEqual(value);
        expect(spy).toHaveBeenCalled();
      });

    }));

    it('should not emit an empty search value', waitForAsync(() => {

      value = ''

      fixture.whenStable().then(() => {
        ngForm.form.setValue({city: value})
        form.triggerEventHandler('submit', null);
        expect(result).not.toEqual(value);
        expect(result).toBeUndefined();
        expect(spy).not.toHaveBeenCalled();
      });
    }));
  })


});

