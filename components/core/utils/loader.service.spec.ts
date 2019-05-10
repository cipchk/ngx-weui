import { LoaderService } from './loader.service';

class MockDocument {
  createElement = jasmine.createSpy('Document createElement').and.returnValue({});
  getElementsByTagName = jasmine.createSpy('Document getElementsByTagName');
}

describe('LoaderService', () => {
  let service: LoaderService;
  let doc: MockDocument;

  beforeEach(() => {
    doc = new MockDocument();
    service = new LoaderService(doc);
  });

  it('should create script tag', () => {
    const JSURL = 'http://test.com/1.js';
    service.load([JSURL]);
    expect(doc.createElement).toHaveBeenCalled();
    expect(doc.getElementsByTagName).toHaveBeenCalled();
  });

  it('should create link tag', () => {
    const CSSURL = 'http://test.com/1.css';
    service.load(CSSURL);
    expect(doc.createElement).toHaveBeenCalled();
    expect(doc.getElementsByTagName).toHaveBeenCalled();
  });

  it('should at once if create exists', () => {
    const JSURL = 'http://test.com/1.js';
    const CSSURL = 'http://test.com/1.css';
    service.load([JSURL, CSSURL]);
    service.load([JSURL, CSSURL]);
    expect(doc.createElement).toHaveBeenCalled();
    expect(doc.getElementsByTagName).toHaveBeenCalled();
  });
});
