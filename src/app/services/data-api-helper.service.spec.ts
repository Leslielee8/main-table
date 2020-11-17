import { TestBed } from '@angular/core/testing';

import { DataApiHelperService } from './data-api-helper.service';

describe('DataApiHelperService', () => {
  let service: DataApiHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataApiHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
