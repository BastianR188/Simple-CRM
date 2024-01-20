import { TestBed } from '@angular/core/testing';

import { MyServiceService } from './firestore.service';
import { Firestore } from '@angular/fire/firestore';

describe('MyServiceService', () => {
  let service: MyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Firestore]
    });
    service = TestBed.inject(MyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
