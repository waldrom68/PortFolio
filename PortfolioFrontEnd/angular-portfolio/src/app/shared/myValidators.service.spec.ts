/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyValidatorsService } from './myValidators.service';

describe('Service: MyValidators', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyValidatorsService]
    });
  });

  it('should ...', inject([MyValidatorsService], (service: MyValidatorsService) => {
    expect(service).toBeTruthy();
  }));
});
