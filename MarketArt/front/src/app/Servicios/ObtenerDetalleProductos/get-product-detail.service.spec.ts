import { TestBed } from '@angular/core/testing';

import { GetProductDetailService } from './get-product-detail.service';

describe('GetProductDetailService', () => {
  let service: GetProductDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
