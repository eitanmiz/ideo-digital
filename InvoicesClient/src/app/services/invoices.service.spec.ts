import { TestBed } from '@angular/core/testing';

import { InvoicesService } from './invoices.service';

describe('InvoicesServiceService', () => {
  let service: InvoicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
