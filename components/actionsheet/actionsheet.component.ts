import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { isAndroid } from 'ngx-weui/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { ActionSheetConfig } from './actionsheet.config';

@Component({
  selector: 'weui-actionsheet',
  exportAs: 'weuiActionsheet',
  templateUrl: './actionsheet.component.html',
  animations: [
    trigger('visibility', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('hide <=> show', [animate(200)]),
    ]),
  ],
  host: {
    '[hidden]': '!_shown',
    '[class.weui-skin_android]': 'config.skin === "android"',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ActionSheetComponent implements OnDestroy {
  private observer: Observer<any>;
  private destroied = false;
  _shown = false;
  /**
   * 动画状态码
   */
  _shownAnt = false;
  /**
   * 配置项
   */
  @Input() config: ActionSheetConfig;

  /**
   * 菜单内容
   */
  @Input() menus: Array<{ text?: string; [key: string]: any }> = [];

  /**
   * 关闭回调
   */
  @Output() readonly close = new EventEmitter();

  get _visibility(): string {
    return this._shownAnt ? 'show' : 'hide';
  }

  constructor(private DEF: ActionSheetConfig, private cdr: ChangeDetectorRef) {}

  private detectChanges() {
    if (this.destroied) return;
    this.cdr.detectChanges();
  }

  /**
   * 显示，组件载入页面后并不会显示，显示调用 `show()` 并订阅结果。
   */
  show(): Observable<any> {
    this.config = {
      backdrop: true,
      skin: 'auto',
      ...this.DEF,
      ...this.config,
    };
    if (this.config.skin === 'auto') {
      this.config.skin = isAndroid() ? 'android' : 'ios';
    }
    this._shown = true;
    setTimeout(() => {
      this._shownAnt = true;
      this.detectChanges();
    }, 10);
    return new Observable((observer: Observer<any>) => {
      this.observer = observer;
    });
  }

  /**
   * 隐藏
   *
   * @param is_backdrop 是否从背景上点击
   */
  hide(is_backdrop?: boolean) {
    if (is_backdrop === true && this.config.backdrop === false) return false;

    this._shownAnt = false;
    this.detectChanges();
    setTimeout(
      () => {
        this._shown = false;
        this.close.emit();
      },
      this.config.skin === 'android' ? 200 : 300,
    );
  }

  /**
   * 选择动作
   */
  _onSelect(menu: { text?: string; [key: string]: any }) {
    this.observer.next(menu);
    this.observer.complete();
    this.hide();
  }

  ngOnDestroy(): void {
    this.destroied = true;
    if (this.observer && this.observer instanceof Subscription) {
      (this.observer as Subscription).unsubscribe();
    }
  }
}
