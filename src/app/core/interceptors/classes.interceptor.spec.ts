import { TestBed } from '@angular/core/testing';

import { ClassesInterceptor } from './classes.interceptor';

describe('ClassesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ClassesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ClassesInterceptor = TestBed.inject(ClassesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
