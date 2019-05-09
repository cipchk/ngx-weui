import { Component } from '@angular/core';
import { inject, TestBed, ComponentFixture } from '@angular/core/testing';

import { LoaderService } from '../utils/loader.service';
import { JWeiXinModule } from './jweixin.module';
import { JWeiXinService } from './jweixin.service';

class MockLoaderService {
  loadScript() {
    return new Promise(resolve => {
      resolve({ loaded: true });
    });
  }
}

describe('jweixin: JWeiXinService', () => {
  let fixture: ComponentFixture<EmptyTestComponent>;
  let service: JWeiXinService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyTestComponent],
      imports: [JWeiXinModule.forRoot()],
      providers: [JWeiXinService, { provide: LoaderService, useClass: MockLoaderService }],
    });

    fixture = TestBed.createComponent(EmptyTestComponent);
    fixture.detectChanges();
  });

  beforeEach(inject([JWeiXinService], (loader: JWeiXinService) => {
    service = loader;
  }));

  it('#get', (done: () => void) => {
    service.get().then(status => {
      expect(status).toBe(true);
      done();
    });
  });
});

@Component({ template: '' })
class EmptyTestComponent {}
