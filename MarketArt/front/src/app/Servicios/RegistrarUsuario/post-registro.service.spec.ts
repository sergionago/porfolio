import { TestBed } from '@angular/core/testing';

import { PostRegistroService } from './post-registro.service';

describe('PostRegistroService', () => {
  let service: PostRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
