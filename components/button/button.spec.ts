import { Component } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ButtonType, UpdateHostClassService } from 'ngx-weui/core';

import { ButtonComponent, ButtonModule } from '../button';

const html = `
    <weui-button id="default"
        [weui-type]="type"
        [weui-loading]="loading"
        [weui-mini]="mini"
        [weui-plain]="plain"
        [weui-cell]="cell"
        [weui-block]="block"
        [disabled]="disabled">default<weui-button>
`;

describe('Component: Button', () => {
  let fixture: ComponentFixture<TestButtonComponent>;
  let context: TestButtonComponent;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestButtonComponent],
      imports: [ButtonModule, FormsModule],
      providers: [UpdateHostClassService, { provide: ComponentFixtureAutoDetect, useValue: true }],
    });
    TestBed.overrideComponent(TestButtonComponent, {
      set: { template: html },
    });
    fixture = TestBed.createComponent(TestButtonComponent);
    context = fixture.debugElement.componentInstance;
    el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  describe('weui style', () => {
    it('should work weui-style', () => {
      expect(el.querySelector('#default').classList).toContain('weui-btn');
      expect(el.querySelector('#default').classList).toContain('weui-btn_primary');
      context.type = 'default';
      fixture.detectChanges();
      expect(el.querySelector('#default').classList).toContain('weui-btn_default');
      context.type = 'warn';
      fixture.detectChanges();
      expect(el.querySelector('#default').classList).toContain('weui-btn_warn');
    });
    it('with cell, should be not weui-btn, muse be use weui-btn_cell', () => {
      context.cell = true;
      fixture.detectChanges();
      expect(el.querySelector('#default').classList).toContain('weui-btn_cell');
      expect(el.querySelector('#default').classList).not.toContain('weui-btn');
    });
    it('with block', () => {
      context.block = true;
      fixture.detectChanges();
      expect(el.querySelector('#default').classList).toContain('weui-btn_block');
    });
  });

  it('should have class loading by loading=true', () => {
    context.loading = true;
    fixture.detectChanges();
    expect(el.querySelector('#default').classList).toContain('weui-btn_loading');
    expect(el.querySelector('.weui-loading')).not.toBeNull();
  });

  it('should have class plain by plain=true', () => {
    context.plain = true;
    fixture.detectChanges();
    expect(el.querySelector('#default').classList).toContain('weui-btn_plain-primary');
  });

  it('should have class mini by mini=true', () => {
    context.mini = true;
    fixture.detectChanges();
    expect(el.querySelector('#default').classList).toContain('weui-btn_mini');
  });

  it('should have class disabled by disabled=true', () => {
    context.disabled = true;
    fixture.detectChanges();
    expect(el.querySelector('#default').classList).toContain('weui-btn_disabled');
  });
});

@Component({
  selector: 'test-button',
  template: ``,
})
class TestButtonComponent extends ButtonComponent {
  type: ButtonType = 'primary';
  loading = false;
  mini = false;
  plain = false;
  disabled = false;
  cell = false;
  block = false;
}
