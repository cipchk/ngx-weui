import {
  Component,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { isAndroid } from '../utils/browser';
import { ActionSheetConfig } from './actionsheet.config';
import { Observer, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'weui-actionsheet',
  template: `
    <div class="weui-mask" [@visibility]="_visibility" (click)="hide(true)"></div>
    <div class="weui-actionsheet" [ngClass]="{'weui-actionsheet_toggle': _shownAnt && config.skin === 'ios'}">
      <div class="weui-actionsheet__title" *ngIf="config.skin === 'ios' && config.title">
        <p class="weui-actionsheet__title-text">{{config.title}}</p>
      </div>
      <div class="weui-actionsheet__menu">
        <div class="weui-actionsheet__cell" *ngFor="let item of menus" (click)="_onSelect(item)">{{item.text}}</div>
      </div>
      <div class="weui-actionsheet__action" *ngIf="config.skin === 'ios' && config.cancel">
        <div class="weui-actionsheet__cell" (click)="hide()">{{config.cancel}}</div>
      </div>
    </div>
  `,
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
  }
})
export class ActionSheetComponent implements OnDestroy {
  /**
   * 配置项
   */
  @Input() config: ActionSheetConfig;

  /**
   * 菜单内容
   */
  @Input() menus: { text?: string; [key: string]: any }[];

  /**
   * 关闭回调
   */
  @Output() close = new EventEmitter();

  _shown: boolean = false;
  /**
   * 动画状态码
   */
  _shownAnt = false;

  private observer: Observer<any>;

  get _visibility(): string {
    return this._shownAnt ? 'show' : 'hide';
  }

  constructor(private DEF: ActionSheetConfig) { }

  /**
   * 显示，组件载入页面后并不会显示，显示调用 `show()` 并订阅结果。
   */
  show(): Observable<any> {
    this.config = Object.assign(
      {
        backdrop: true,
        skin: 'auto',
      },
      this.DEF,
      this.config,
    );
    if (this.config.skin === 'auto') {
      this.config.skin = isAndroid() ? 'android' : 'ios';
    }
    this._shown = true;
    setTimeout(() => {
      this._shownAnt = true;
    }, 10);
    return Observable.create((observer: Observer<any>) => {
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
    setTimeout(() => {
      this._shown = false;
      this.close.emit();
    }, this.config.skin === 'android' ? 200 : 300);
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
    if (this.observer && this.observer instanceof Subscription) {
      (<Subscription>this.observer).unsubscribe();
    }
  }
}
