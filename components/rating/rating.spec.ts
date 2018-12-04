import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { RatingComponent } from './rating.component';
import { RatingModule } from './rating.module';
import { RatingConfig } from './rating.config';

describe('Component: Rating', () => {
  describe('Init', () => {
    let fixture: ComponentFixture<RatingComponent>;
    let context: RatingComponent;
    let el: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RatingModule.forRoot()],
      });
      fixture = TestBed.createComponent(RatingComponent);
      fixture.componentInstance._setConfig(null);
      context = fixture.debugElement.componentInstance;

      el = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('should working with default value', () => {
      const items = el.querySelectorAll('.weui-rating__sr-only');

      expect(items.length).toEqual(5);
      expect(items[0].innerHTML).toEqual('( )');
      expect(items[4].innerHTML).toEqual('( )');
      expect(items[5]).toBeUndefined();

      const icons = el.querySelectorAll('i');

      expect(icons[0].classList).toContain('weui-icon-circle');
      expect(icons[4].classList).toContain('weui-icon-circle');
      expect(icons[4].getAttribute('title')).toEqual('5');
    });

    it('should working with changed value', () => {
      context._setConfig({
        max: 3,
        titles: ['one', 'two'],
        stateOff: 'fa-circle',
      });
      fixture.detectChanges();
      const items = el.querySelectorAll('.weui-rating__sr-only');

      expect(items.length).toEqual(3);
      expect(items[0].innerHTML).toEqual('( )');
      expect(items[2].innerHTML).toEqual('( )');
      expect(items[3]).toBeUndefined();

      const icons = el.querySelectorAll('i');

      expect(icons[0].classList).toContain('fa-circle');
      expect(icons[1].title).toContain('two');
    });
  });

  describe('Touch', () => {
    const tpl = `<weui-rating [(ngModel)]="rate" [config]="cog" [readonly]="readonly"></weui-rating>`;
    let fixture: ComponentFixture<TestRatingComponent>;
    let context: TestRatingComponent;
    let element: HTMLElement;

    beforeEach(
      fakeAsync(() => {
        TestBed.configureTestingModule({
          declarations: [TestRatingComponent],
          imports: [RatingModule.forRoot(), FormsModule],
        });
        TestBed.overrideComponent(TestRatingComponent, {
          set: { template: tpl },
        });
        fixture = TestBed.createComponent(TestRatingComponent);
        context = fixture.debugElement.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
      }),
    );

    it(
      'check simple click',
      fakeAsync(() => {
        const items = element.querySelectorAll('.weui-rating__sr-only');
        const icons = element.querySelectorAll('i');

        expect(items[0].innerHTML).toEqual('( )');
        expect(icons[0].classList).toContain('weui-icon-circle');
        expect(icons[0].classList).not.toContain('weui-icon-download');

        icons[1].click();
        tick(200);
        fixture.detectChanges();

        expect(items[0].innerHTML).toEqual('(*)');
        expect(icons[0].classList).not.toContain('weui-icon-circle');
        expect(icons[0].classList).toContain('weui-icon-download');
      }),
    );

    it(
      'check disabling',
      fakeAsync(() => {
        const items = element.querySelectorAll('.weui-rating__sr-only');
        const icons = element.querySelectorAll('i');

        expect(items[0].innerHTML).toEqual('( )');
        expect(icons[0].classList).toContain('weui-icon-circle');
        expect(icons[0].classList).not.toContain('weui-icon-download');

        context.readonly = true;
        fixture.detectChanges();

        icons[1].click();
        tick(200);
        fixture.detectChanges();

        expect(items[0].innerHTML).toEqual('( )');
        expect(icons[0].classList).toContain('weui-icon-circle');
        expect(icons[0].classList).not.toContain('weui-icon-download');

        context.readonly = false;
        fixture.detectChanges();

        icons[1].click();
        tick(200);
        fixture.detectChanges();

        expect(items[0].innerHTML).toEqual('(*)');
        expect(icons[0].classList).not.toContain('weui-icon-circle');
        expect(icons[0].classList).toContain('weui-icon-download');
      }),
    );
  });
});

@Component({ template: `` })
class TestRatingComponent {
  cog: RatingConfig = {
    max: 6,
    states: [
      { off: 'weui-icon-circle', on: 'weui-icon-download' },
      { off: 'weui-icon-circle', on: 'weui-icon-info' },
      { off: 'weui-icon-circle', on: 'weui-icon-warn' },
      { off: 'weui-icon-circle', on: 'weui-icon-waiting' },
      { off: 'weui-icon-circle', on: 'weui-icon-search' },
    ],
    titles: ['第1个', '第二个'],
  };
  rate: number = 0;
  readonly: boolean = false;
}
