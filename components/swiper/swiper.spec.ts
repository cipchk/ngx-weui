import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SwiperComponent, SwiperModule } from '../swiper';

const correct_html = `
    <weui-swiper [options]="options">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" *ngFor="let i of [1, 2, 3, 4]">
                    Slide {{i}}
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </weui-swiper>`;
const incorrect_html = `
    <weui-swiper [options]="options">
        <div class="swiper-container123">
            <div class="swiper-wrapper">
                <div class="swiper-slide" *ngFor="let i of [1, 2, 3, 4]">
                    Slide {{i}}
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </weui-swiper>`;

describe('Component: Swiper', () => {
  let fixture: ComponentFixture<TestSwiperComponent>;
  let context: TestSwiperComponent;
  let el: HTMLElement;

  describe('[basic]', () => {
    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestSwiperComponent],
        imports: [SwiperModule, NoopAnimationsModule],
      });
      TestBed.overrideComponent(TestSwiperComponent, {
        set: { template: correct_html },
      });
      fixture = TestBed.createComponent(TestSwiperComponent);
      context = fixture.componentInstance;
      el = fixture.nativeElement;
      fixture.detectChanges();
      tick();
    }));

    it('should be inited if correct DOM structure', () => {
      expect(context.comp.swiper).not.toBeNull();
    });

    it('should change direction="vertical" by options', () => {
      context.options = {
        direction: 'vertical',
      };
      fixture.detectChanges();
      expect(el.querySelector('.swiper-container')!.classList).toContain('swiper-container-vertical');
    });
  });

  describe('[incorrect DOM structure]', () => {
    it('should be init fail', () => {
      try {
        TestBed.configureTestingModule({
          declarations: [TestSwiperComponent],
          imports: [SwiperModule, NoopAnimationsModule],
        });
        TestBed.overrideComponent(TestSwiperComponent, {
          set: { template: incorrect_html },
        });
        fixture = TestBed.createComponent(TestSwiperComponent);
        fixture.detectChanges();
        expect(false).toBe(true);
      } catch (ex) {
        expect(ex.toString()).toBe('Error: 组件内容的HTML跟swiper所需要的DOM结构必须完全一样。');
      }
    });
  });
});

@Component({ template: `` })
class TestSwiperComponent {
  @ViewChild(SwiperComponent, { static: true }) comp: SwiperComponent;

  options: any = {
    direction: 'horizontal',
  };
}
