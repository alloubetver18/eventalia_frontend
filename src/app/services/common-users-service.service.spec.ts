import { TestBed } from '@angular/core/testing';

import { CommonUsersServiceService } from './common-users-service.service';

describe('CommonUsersServiceService', () => {
  let service: CommonUsersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonUsersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
