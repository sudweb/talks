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
  entries: Object;

  constructor(
    private spreadsheetService: SpreadsheetService,
  ){}

  getTalks(): void {
    this.spreadsheetService
        .getTalks().then(talks => {
          this.talks = talks;
          this.spreadsheetService
              .getEntries().then(entries => {
                this.entries = entries;
                console.log(this.entries)
              })
          console.log(this.talks)
        })
  }
  
  ngOnInit(): void {
    this.getTalks();
  }
}
