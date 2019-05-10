import { Injector, StaticProvider } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { LoaderService } from './loader.service';

class MockDocument {
  createElement = jasmine.createSpy('Document createElement').and.returnValue({});
  getElementsByTagName = jasmine.createSpy('Document getElementsByTagName');
}

describe('LoaderService', () => {
  let service: LoaderService;
  let document: MockDocument;

  beforeEach(() => {
    const providers = [
      { provide: LoaderService, useClass: LoaderService, deps: [] },
      { provide: DOCUMENT, useClass: MockDocument, deps: [] },
    ] as StaticProvider[];
    const injector = Injector.create({ providers });
    service = injector.get<LoaderService>(LoaderService);
    document = injector.get<MockDocument>(DOCUMENT);
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
