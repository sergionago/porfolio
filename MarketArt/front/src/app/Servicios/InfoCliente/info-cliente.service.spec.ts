import { TestBed } from '@angular/core/testing';

import { InfoClienteService } from './info-cliente.service';

describe('PedidosClienteService', () => {
  let service: InfoClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
