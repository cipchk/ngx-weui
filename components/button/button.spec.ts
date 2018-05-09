import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  ComponentFixtureAutoDetect,
} from '@angular/core/testing';

import { ButtonModule, ButtonConfig, ButtonComponent } from '../button';

const html = `
    <weui-button id="default"
        [weui-type]="type"
        [weui-loading]="loading"
        [weui-mini]="mini"
        [weui-plain]="plain"
        [disabled]="disabled">default<weui-button>
`;

describe('Component: Button', () => {
  let fixture: ComponentFixture<TestButtonComponent>;
  let context: any;
  let el: any;

  beforeEach(
    fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestButtonComponent],
        imports: [ButtonModule.forRoot(), FormsModule],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      });
      TestBed.overrideComponent(TestButtonComponent, {
        set: { template: html },
      });
      fixture = TestBed.createComponent(TestButtonComponent);
      context = fixture.debugElement.componentInstance;
      el = fixture.nativeElement;
      fixture.detectChanges();
      tick();
    }),
  );

  describe('default', () => {
    it(
      'should work weui-style',
      fakeAsync(() => {
        expect(el.querySelector('#default').classList).toContain('weui-btn');
        expect(el.querySelector('#default').classList).toContain(
          'weui-btn_primary',
        );
        context.type = 'default';
        fixture.detectChanges();
        tick();
        expect(el.querySelector('#default').classList).toContain(
          'weui-btn_default',
        );
        context.type = 'warn';
        fixture.detectChanges();
        tick();
        expect(el.querySelector('#default').classList).toContain(
          'weui-btn_warn',
        );
      }),
    );

    it(
      'should have class loading by loading=true',
      fakeAsync(() => {
        context.loading = true;
        fixture.detectChanges();
        tick();
        expect(el.querySelector('#default').classList).toContain(
          'weui-btn_loading',
        );
        expect(el.querySelector('.weui-loading')).not.toBeNull();
      }),
    );

    it(
      'should have class plain by plain=true',
      fakeAsync(() => {
        context.plain = true;
        fixture.detectChanges();
        tick();
        expect(el.querySelector('#default').classList).toContain(
          'weui-btn_plain-primary',
        );
      }),
    );

    it(
      'should have class mini by mini=true',
      fakeAsync(() => {
        context.mini = true;
        fixture.detectChanges();
        tick();
        expect(el.querySelector('#default').classList).toContain(
          'weui-btn_mini',
        );
      }),
    );

    it(
      'should have class disabled by disabled=true',
      fakeAsync(() => {
        context.disabled = true;
        fixture.detectChanges();
        tick();
        expect(el.querySelector('#default').classList).toContain(
          'weui-btn_disabled',
        );
      }),
    );
  });
});

@Component({
  selector: 'test-button',
  template: ``,
})
class TestButtonComponent extends ButtonComponent {
  loading = false;
  mini = false;
  plain = false;
  disabled = false;
  constructor(config: ButtonConfig) {
    super(config);
  }
}
