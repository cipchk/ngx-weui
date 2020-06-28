import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressComponent } from './progress.component';
import { ProgressModule } from './progress.module';

describe('Component: Progress', () => {
  let fixture: ComponentFixture<TestProgressComponent>;
  let context: TestProgressComponent;
  let comp: ProgressComponent;
  let barEl: HTMLElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestProgressComponent],
      imports: [ProgressModule],
    });
    fixture = TestBed.createComponent(TestProgressComponent);
    context = fixture.componentInstance;
    spyOn(context, 'cancel');
    fixture.detectChanges();
    comp = fixture.debugElement.query(By.css('weui-progress')).componentInstance as ProgressComponent;
    barEl = fixture.debugElement.query(By.css('.weui-progress__inner-bar')).nativeElement as HTMLElement;
    tick();
  }));

  it('should define default values', () => {
    expect(comp._value).toBe(0);
    expect(comp.canCancel).toBe(true);
  });

  it('should value between 0 and 100', () => {
    const VALUES = [
      { v: 50, r: 50 },
      { v: 101, r: 100 },
      { v: -10, r: 0 },
    ];
    for (const item of VALUES) {
      comp.value = item.v;
      expect(comp._value).toBe(item.r);
    }
  });

  it('should set "width" style value', () => {
    comp.value = 10;
    fixture.detectChanges();
    expect(barEl.style.width).toBe('10%');

    comp.value = 99;
    fixture.detectChanges();
    expect(barEl.style.width).toBe('99%');
  });

  it('should be cancel', () => {
    (fixture.debugElement.query(By.css('.weui-progress__opr')).nativeElement as HTMLLinkElement).click();
    fixture.detectChanges();
    expect(context.cancel).toHaveBeenCalled();
  });
});

@Component({
  template: ` <weui-progress (cancel)="cancel()"></weui-progress> `,
})
class TestProgressComponent {
  cancel() {}
}
