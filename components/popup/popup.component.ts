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
import { Observable, Observer, Subscription } from 'rxjs';
import { PopupConfig } from './popup.config';

@Component({
  selector: 'weui-popup',
  exportAs: 'weuiPopup',
  templateUrl: './popup.component.html',
  animations: [
    trigger('visibility', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('hide <=> show', [animate(200)]),
    ]),
  ],
  host: {
    '[hidden]': '!shown',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PopupComponent implements OnDestroy {
  private observer: Observer<boolean>;
  shown: boolean = false;
  _shownAnt = false;

  private _config: PopupConfig;
  @Input()
  set config(val: PopupConfig) {
    this._config = { ...this.DEF, ...val };
  }
  get config() {
    return this._config;
  }
  @Output() readonly cancel = new EventEmitter();
  @Output() readonly confirm = new EventEmitter();

  get _visibility(): string {
    return this._shownAnt ? 'show' : 'hide';
  }

  constructor(private DEF: PopupConfig, private cdr: ChangeDetectorRef) {
    this.config = { ...DEF };
  }

  /**
   * 显示，并支持订阅结果，如果点击取消值为false，反之 true
   */
  show(): Observable<boolean> {
    this.shown = true;
    setTimeout(() => {
      this._shownAnt = true;
      this.cdr.detectChanges();
    }, 10);
    return new Observable((observer: Observer<boolean>) => {
      this.observer = observer;
    });
  }

  /**
   * 隐藏
   *
   * @param [is_backdrop] 是否从背景上点击(可选)
   */
  hide(is_backdrop?: boolean): void {
    if (is_backdrop === true && this.config.backdrop === false) return;

    this._shownAnt = false;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.shown = false;
    }, 300);
  }

  /** 关闭，等同 `hide()` 效果 */
  close(): void {
    this.hide(false);
  }

  _onCancel(): boolean {
    this.cancel.emit();
    this.hide(false);
    if (this.observer) {
      this.observer.next(false);
      this.observer.complete();
    }
    return false;
  }

  _onConfirm(): boolean {
    this.confirm.emit();
    this.hide(false);
    if (this.observer) {
      this.observer.next(true);
      this.observer.complete();
    }
    return false;
  }

  ngOnDestroy(): void {
    if (this.observer && this.observer instanceof Subscription) {
      this.observer.unsubscribe();
    }
  }
}
