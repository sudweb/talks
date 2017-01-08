import { Component, OnInit } from '@angular/core';
// import { Observable }        from 'rxjs/Observable';

import { SpreadsheetService } from './spreadsheet.service';
import { Talks } from './talks';

const TALKS: Talks[] = [
  {title: 'blablabla', name: 'machin truc'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SpreadsheetService]
})
export class AppComponent implements OnInit {
  talks = TALKS;

  constructor(
    private spreadsheetService: SpreadsheetService,
  ){}

  getTalks(): void {
    this.spreadsheetService
        .getTalks()
  }

  ngOnInit(): void {
    this.getTalks();
  }
}
