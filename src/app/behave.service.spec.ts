import { TestBed, inject } from '@angular/core/testing';

import { BehaveService } from './behave.service';

describe('BehaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BehaveService]
    });
  });

  it('should be created', inject([BehaveService], (service: BehaveService) => {
    expect(service).toBeTruthy();
  }));
});
