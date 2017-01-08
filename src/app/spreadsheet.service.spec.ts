/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpreadsheetService } from './spreadsheet.service';

describe('SpreadsheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpreadsheetService]
    });
  });

  it('should ...', inject([SpreadsheetService], (service: SpreadsheetService) => {
    expect(service).toBeTruthy();
  }));
});
