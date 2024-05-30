import { TestBed } from '@angular/core/testing';

import { CanactivateguardService } from './canactivateguard.service';

describe('CanactivateguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanactivateguardService = TestBed.get(CanactivateguardService);
    expect(service).toBeTruthy();
  });
});
