import { Injector, ReflectiveInjector } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { LoaderService } from './loader.service';

class MockDocument {
  createElement = jasmine
    .createSpy('Document createElement')
    .and.returnValue({});
  getElementsByTagName = jasmine.createSpy('Document getElementsByTagName');
}

describe('LoaderService', () => {
  let service: LoaderService;
  let document: MockDocument;

  beforeEach(() => {
    const injector = ReflectiveInjector.resolveAndCreate([
      LoaderService,
      { provide: DOCUMENT, useClass: MockDocument },
    ]);
    service = injector.get(LoaderService);
    document = injector.get(DOCUMENT);
  });

  it('should create script tag', () => {
    const JSURL = 'http://test.com/1.js';
    service.load([JSURL]);
    expect(document.createElement).toHaveBeenCalled();
    expect(document.getElementsByTagName).toHaveBeenCalled();
  });

  it('should create link tag', () => {
    const CSSURL = 'http://test.com/1.css';
    service.load(CSSURL);
    expect(document.createElement).toHaveBeenCalled();
    expect(document.getElementsByTagName).toHaveBeenCalled();
  });

  it('should at once if create exists', () => {
    const JSURL = 'http://test.com/1.js';
    const CSSURL = 'http://test.com/1.css';
    service.load([JSURL, CSSURL]);
    service.load([JSURL, CSSURL]);
    expect(document.createElement).toHaveBeenCalled();
    expect(document.getElementsByTagName).toHaveBeenCalled();
  });
});
