import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  ComponentFixtureAutoDetect,
} from '@angular/core/testing';

import { MaskModule, MaskComponent } from '../mask';

const html = `<weui-mask [backdrop]="backdrop" (close)="close()"><weui-mask>`;

describe('Component: Button', () => {
  let fixture: ComponentFixture<TestMaskComponent>;
  let context: TestMaskComponent;
  let el: HTMLElement;
  let dl: DebugElement;

  beforeEach(
    fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestMaskComponent],
        imports: [MaskModule.forRoot(), FormsModule],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      });
      TestBed.overrideComponent(TestMaskComponent, { set: { template: html } });
      fixture = TestBed.createComponent(TestMaskComponent);
      context = fixture.componentInstance;
      spyOn(context, 'close');
      el = fixture.nativeElement;
      dl = fixture.debugElement;
      fixture.detectChanges();
      tick();
    }),
  );

  it('should be inited', () => {
    expect(fixture).not.toBeUndefined();
  });

  it(
    'should closed via backdrop',
    fakeAsync(() => {
      const maskEl = dl.queryAll(By.css('.weui-mask'))[0];
      context.mask.show().subscribe();
      fixture.detectChanges();
      tick(10);
      expect(context.mask._shown).toBe(true);
      (maskEl.nativeElement as HTMLDivElement).click();
      fixture.detectChanges();
      expect(context.close).toHaveBeenCalled();
      expect(context.mask._shown).toBe(false);
    }),
  );

  it(
    'should not-allow closing via backdrop',
    fakeAsync(() => {
      context.backdrop = false;
      fixture.detectChanges();
      tick(10);
      const maskEl = dl.queryAll(By.css('.weui-mask'))[0];
      context.mask.show().subscribe();
      fixture.detectChanges();
      tick(10);
      context.mask.hide(true);
      expect(context.mask._shown).toBe(true);
      expect(context.close).not.toHaveBeenCalled();
    }),
  );
});

@Component({ template: `` })
class TestMaskComponent {
  @ViewChild(MaskComponent) mask: MaskComponent;

  backdrop = true;
  close() {}
}
