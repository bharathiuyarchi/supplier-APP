import { TestBed } from '@angular/core/testing';

import { VerfyotpService } from './verfyotp.service';

describe('VerfyotpService', () => {
  let service: VerfyotpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerfyotpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
