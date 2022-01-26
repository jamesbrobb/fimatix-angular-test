import {Component, Input, OnChanges} from '@angular/core';
import {Weather} from "../../../model/weather";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnChanges {

  @Input('cities') ioCities!: Weather[];

  cities: Weather[];

  constructor() { }

  ngOnChanges() {
    this.cities = this.ioCities;
  }
}


