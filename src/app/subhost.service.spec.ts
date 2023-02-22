import { TestBed } from '@angular/core/testing';

import { SubhostService } from './subhost.service';

describe('SubhostService', () => {
  let service: SubhostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubhostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
