import {Component, AfterViewInit} from '@angular/core';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  	title = 'app';

  	ngAfterViewInit() {
  		if (window.hasOwnProperty('livesass') && typeof window['livesass'] === 'function') {
  			window['livesass']();
  		}
	}
}
