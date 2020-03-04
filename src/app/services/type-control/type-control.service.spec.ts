import { TestBed } from '@angular/core/testing';

import { TypeControlService } from './type-control.service';

describe('TypeControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeControlService = TestBed.get(TypeControlService);
    expect(service).toBeTruthy();
  });
});
