import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Component, DebugElement, enableProdMode } from '@angular/core';

import { UploaderModule, Uploader, UploaderFileDirective } from '../uploader';
import { By } from '@angular/platform-browser';

const html = `<input type="file" accept="image/*" multiple [weui-uploader-file]="uploader">`;
const URL = 'http://test.com';

describe('Component: Uploader', () => {
  let fixture: ComponentFixture<TestUploaderDirectiveComponent>;
  let directiveEl: DebugElement;
  let directive: UploaderFileDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestUploaderDirectiveComponent],
      imports: [UploaderModule.forRoot()],
    });
    TestBed.overrideComponent(TestUploaderDirectiveComponent, {
      set: { template: html },
    });
    fixture = TestBed.createComponent(TestUploaderDirectiveComponent);
    fixture.detectChanges();

    directiveEl = fixture.debugElement.query(
      By.directive(UploaderFileDirective),
    );
    directive = directiveEl.injector.get(
      UploaderFileDirective,
    ) as UploaderFileDirective;
  });

  it('should be inited', () => {
    expect(fixture).toBeDefined();
    expect(directiveEl).toBeDefined();
    expect(directive).toBeDefined();
    expect(directive.uploader).toBe(fixture.componentInstance.uploader);

    const options = directive._options;
    expect(options.url).toBe(URL);

    expect(directive._isEmptyAfterSelection).toBe(true);
  });

  it('should be trigger event', () => {
    spyOn(directive, '_onChange');
    directiveEl.triggerEventHandler('change', {});
    expect(directive._onChange).toHaveBeenCalled();
  });

  it('should handle event', () => {
    spyOn(directive.uploader, 'addToQueue');
    directive._onChange();
    const args = [
      (directiveEl.nativeElement as HTMLInputElement).files,
      directive._options,
    ];
    expect(directive.uploader.addToQueue).toHaveBeenCalledWith(...args);
  });

  describe('CLASS', () => {
    const file1 = new File(
      [
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWK1WDwAC1gFS81OXVgAAAABJRU5ErkJggg==',
      ],
      'file1.png',
      { type: 'image/png' },
    );
    const file2 = new File(
      [
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWK1WDwAC1gFS81OXVgAAAABJRU5ErkJggg==',
      ],
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
