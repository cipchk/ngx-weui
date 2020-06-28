import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Uploader, UploaderFileDirective, UploaderModule } from '../uploader';

const html = `<input type="file" accept="image/*" multiple [weui-uploader-file]="uploader">`;
const URL = 'http://test.com';
const FILECONTENT = [`iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`];
const FILE = new File(FILECONTENT, '');

describe('Component: Uploader', () => {
  let fixture: ComponentFixture<TestUploaderDirectiveComponent>;
  let directiveEl: DebugElement;
  let directive: UploaderFileDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestUploaderDirectiveComponent],
      imports: [UploaderModule],
    });
    TestBed.overrideComponent(TestUploaderDirectiveComponent, {
      set: { template: html },
    });
    fixture = TestBed.createComponent(TestUploaderDirectiveComponent);
    fixture.detectChanges();

    directiveEl = fixture.debugElement.query(By.directive(UploaderFileDirective));
    directive = directiveEl.injector.get<UploaderFileDirective>(UploaderFileDirective);
  });

  it('should be inited', () => {
    expect(fixture).toBeDefined();
    expect(directiveEl).toBeDefined();
    expect(directive).toBeDefined();
    expect(directive.uploader).toBe(fixture.componentInstance.uploader);

    const options = directive.uploader.options;
    expect(options.url).toBe(URL);
  });

  it('should be trigger event', () => {
    spyOn(directive, '_onChange');
    directiveEl.triggerEventHandler('change', {});
    expect(directive._onChange).toHaveBeenCalled();
  });

  it('should upload a file', () => {
    directive._onChange({ target: { files: [FILE], attributes: {} } } as any);
    expect(directive.uploader.queue.length).toBe(1);
  });

  describe('CLASS', () => {
    const file1 = new File(
      ['iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWK1WDwAC1gFS81OXVgAAAABJRU5ErkJggg=='],
      'file1.png',
      { type: 'image/png' },
    );
    const file2 = new File(
      ['iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWK1WDwAC1gFS81OXVgAAAABJRU5ErkJggg=='],
      'file2.png',
      { type: 'image/png' },
    );

    let up: Uploader;

    beforeEach(() => {
      up = directive.uploader;
      up.addToQueue([file1, file2], up.options);
      fixture.detectChanges();
    });

    it('#constructor', () => {
      expect(up.queue.length).toBe(2);
      expect(up.uploadedCount).toBe(0);
    });

    it('#removeFromQueue', () => {
      up.removeFromQueue(0);
      expect(up.queue.length).toBe(1);
    });

    it('#clearQueue', () => {
      up.clearQueue();
      expect(up.queue.length).toBe(0);
    });

    it('#uploadItem', () => {
      up.uploadItem(up.queue[0]);
      expect(up.isUploading).toBe(true);
      expect(up.queue[0].isReady).toBe(true);
      expect(up.queue[1].isReady).toBe(false);
    });

    it('#cancelItem', () => {
      up.uploadItem(up.queue[0]);
      up.cancelItem(up.queue[0]);
      expect(up.isUploading).toBe(false);
      expect(up.getReadyItems.length).toBe(0);
    });

    it('#uploadAll', () => {
      up.uploadAll();
      expect(up.isUploading).toBe(true);
      expect(up.queue[0].isReady).toBe(true);
      expect(up.queue[1].isReady).toBe(true);
    });

    it('#cancelAll', () => {
      up.uploadItem(up.queue[0]);
      up.cancelAll();
      expect(up.isUploading).toBe(false);
      expect(up.getReadyItems.length).toBe(0);
    });
  });
});

@Component({ template: '' })
export class TestUploaderDirectiveComponent {
  uploader: Uploader = new Uploader({
    url: URL,
    withCredentials: true,
    auto: false,
    limit: -1,
    size: -1,
  });
}
