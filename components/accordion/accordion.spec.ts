import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AccordionModule } from './accordion.module';
import { AccordionConfig } from './accordion.config';

const html = `
  <weui-accordion [collapsible]="collapsible" [activeFirst]="false">
    <weui-accordion-panel
        *ngFor="let item of panels; let index=index;"
        [disabled]="item.disabled"
        [active]="item.active">
        <div class="heading" heading>{{item.title}}</div>
        <div class="content">{{item.content}}</div>
    </weui-accordion-panel>
  </weui-accordion>
`;

const htmlAutoActiveFirst = `
<weui-accordion [collapsible]="collapsible" [activeFirst]="true">
  <weui-accordion-panel
      *ngFor="let item of panels; let index=index;"
      [disabled]="item.disabled"
      [active]="item.active">
      <div class="heading" heading>{{item.title}}</div>
      <div class="content">{{item.content}}</div>
  </weui-accordion-panel>
</weui-accordion>
`;

function getPanels(element: HTMLElement): Element[] {
  return Array.from(element.querySelectorAll('weui-accordion-panel'));
}

function expectOpenPanels(
  nativeEl: HTMLElement,
  openPanelsDef: boolean[],
): void {
  const panels = getPanels(nativeEl);
  expect(panels.length).toBe(openPanelsDef.length);
  for (let i = 0; i < panels.length; i++) {
    const classes = panels[i].classList;
    if (openPanelsDef[i]) {
      expect(classes).toContain('weui-accordion-active');
    } else {
      expect(classes).not.toContain('weui-accordion-active');
    }
  }
}

function hasTitle(element: HTMLElement, str: string): boolean {
  return element.textContent === str;
}

describe('Component: Accordion', () => {
  let fixture: ComponentFixture<TestAccordionComponent>;
  let context: TestAccordionComponent;
  let element: any;
  let dl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAccordionComponent],
      imports: [AccordionModule.forRoot()],
    });
    TestBed.overrideComponent(TestAccordionComponent, {
      set: { template: html },
    });
    fixture = TestBed.createComponent(TestAccordionComponent);
    context = fixture.componentInstance;
    element = fixture.nativeElement;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should have no open panels', () => {
    expectOpenPanels(element, [false, false, false]);
  });

  it('should have open panel based on binding', () => {
    context.panels[0].active = true;
    fixture.detectChanges();
    expectOpenPanels(element, [true, false, false]);
  });

  it('should toggle panel via click header', () => {
    const panels = getPanels(element);
    ((panels[1] as HTMLDivElement).querySelector(
      '[role="tab"]',
    ) as HTMLDivElement).click();
    fixture.detectChanges();
    expectOpenPanels(element, [false, true, false]);
  });

  it('should collapsible=true', () => {
    context.collapsible = true;
    context.panels[0].active = true;
    context.panels[1].active = true;
    fixture.detectChanges();
    expectOpenPanels(element, [true, true, false]);
  });

  it('should be not toggle if panel has disabled', () => {
    context.panels[1].disabled = true;
    fixture.detectChanges();
    expectOpenPanels(element, [false, false, false]);
    const panels = getPanels(element);
    ((panels[1] as HTMLDivElement).querySelector(
      '[role="tab"]',
    ) as HTMLDivElement).click();
    expectOpenPanels(element, [false, false, false]);
  });
});

describe('Component: Accordion: Auto', () => {
  let fixture: ComponentFixture<TestAccordionComponent>;
  let context: any;
  let element: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAccordionComponent],
      imports: [AccordionModule.forRoot()],
    });
    TestBed.overrideComponent(TestAccordionComponent, {
      set: { template: htmlAutoActiveFirst },
    });
    fixture = TestBed.createComponent(TestAccordionComponent);
    context = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should have auto active first panel', () => {
    expectOpenPanels(element, [true, false, false]);
  });
});

@Component({ template: '' })
class TestAccordionComponent {
  public collapsible: boolean = true;
  public panels: any[] = [
    { title: 'title1', content: 'content1', active: false, disabled: false },
    { title: 'title2', content: 'content2', active: false, disabled: false },
    { title: 'title3', content: 'content3', active: false, disabled: false },
  ];

  public constructor(config: AccordionConfig) {
    Object.assign(this, config);
  }
}
