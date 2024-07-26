import { TestBed } from '@angular/core/testing';

import { GetOrderDetailService } from './get-order-detail.service';

describe('GetOrderDetailService', () => {
  let service: GetOrderDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOrderDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
