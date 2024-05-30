import { TestBed } from '@angular/core/testing';

import { BookQueryService } from './book-query.service';

describe('BookQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookQueryService = TestBed.get(BookQueryService);
    expect(service).toBeTruthy();
  });
});
