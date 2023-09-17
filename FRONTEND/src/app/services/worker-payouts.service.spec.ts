import { TestBed } from '@angular/core/testing';

import { WorkerPayoutsService } from './worker-payouts.service';

describe('WorkerPayoutsService', () => {
  let service: WorkerPayoutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerPayoutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
