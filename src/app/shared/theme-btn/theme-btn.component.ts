import { ChangeDetectionStrategy, Component, OnInit, Renderer2 } from '@angular/core';
import { ActionSheetService } from 'ngx-weui/actionsheet';
import { isSSR } from 'ngx-weui/core';

export type SiteTheme = 'light' | 'dark';

@Component({
  selector: 'theme-btn',
  templateUrl: './theme-btn.component.html',
  host: {
    '[class.theme-btn]': `true`,
    '(click)': 'onShow()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeBtnComponent implements OnInit {
  theme: SiteTheme = 'light';

  constructor(private renderer: Renderer2, private srv: ActionSheetService) {}

  ngOnInit(): void {
    if (isSSR) {
      return;
    }
    this.initTheme();
  }

  private initTheme(): void {
    this.theme = (localStorage.getItem('weui-theme') as SiteTheme) || 'dark';
    this.onThemeChange(this.theme);
  }

  onThemeChange(theme: SiteTheme): void {
    this.theme = theme;
    localStorage.setItem('weui-theme', theme);
    this.renderer.setAttribute(document.body, 'data-weui-theme', theme);
  }

  onShow(): void {
    this.srv
      .show([
        { text: 'Light', value: 'light' },
        { text: 'Dark', value: 'dark' },
      ])
      .subscribe(val => this.onThemeChange(val.value));
  }
}
