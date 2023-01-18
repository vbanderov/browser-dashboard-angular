import { TestBed } from '@angular/core/testing';

import { CacheFsService } from './cache-fs.service';

describe('CacheFsService', () => {
  let service: CacheFsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheFsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
