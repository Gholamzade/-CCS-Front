import { TestBed } from '@angular/core/testing';

import { ProductionplanService } from './productionplan.service';

describe('ProductionplanService', () => {
  let service: ProductionplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
