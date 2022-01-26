import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  @Output() onsearch = new EventEmitter<string>();

  search(city: string): void {

    if(!city) {
      return;
    }

    this.onsearch.emit(city);
  }
}
