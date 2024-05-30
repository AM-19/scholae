import { TestBed } from '@angular/core/testing';

import { NlpService } from './nlp.service';

describe('NlpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NlpService = TestBed.get(NlpService);
    expect(service).toBeTruthy();
  });
});
