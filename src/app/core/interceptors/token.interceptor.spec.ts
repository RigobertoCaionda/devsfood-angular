import { TestBed } from '@angular/core/testing';

import { TesteInterceptor } from './token.interceptor';

describe('TesteInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TesteInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TesteInterceptor = TestBed.inject(TesteInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
