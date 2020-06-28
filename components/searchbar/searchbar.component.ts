import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { InputNumber } from 'ngx-weui/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchBarConfig } from './searchbar.config';

@Component({
  selector: 'weui-searchbar',
  exportAs: 'weuiSearchbar',
  templateUrl: './searchbar.component.html',
  host: {
    '[class.weui-search-bar]': `true`,
    '[class.weui-search-bar_focusing]': `_focus`,
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchBarComponent implements OnInit, OnDestroy {
  _q: string = '';
  /**
   * 占位符，默认：`搜索`
   */
  @Input() placeholder: string;

  /**
   * 取消按键文字，默认：`取消`
   */
  @Input() cancelText: string;
  /**
   * 去抖时长（单位：ms），默认：`300`
   */
  @Input() @InputNumber() debounceTime: number;
  /** 搜索回调 */
  @Output() readonly search = new EventEmitter<string>();
  /** 取消回调 */
  @Output() readonly cancel = new EventEmitter();
  /** 清空回调 */
  @Output() readonly clear = new EventEmitter();
  /** 提交回调（指的是键盘回车后） */
  @Output() readonly submit = new EventEmitter<string>();

  _focus: boolean = false;
  @ViewChild('term', { static: true }) private _term: ElementRef<HTMLInputElement>;

  private _sub: Subscription;
  private _subject = new Subject<string>();
  @Input()
  set value(_value: string) {
    this._q = _value;
  }

  constructor(DEF: SearchBarConfig) {
    Object.assign(this, DEF);
  }

  ngOnInit(): void {
    this._sub = this._subject.pipe(debounceTime(this.debounceTime), distinctUntilChanged()).subscribe((q: string) => {
      this.search.emit(q);
    });
  }

  _doFocus(): void {
    this._term.nativeElement.focus();
  }

  _onBlur(): void {
    if (this._q === '') {
      this._focus = false;
    }
  }

  _onSearch(): void {
    this._subject.next(this._q);
  }

  _onCancel(): void {
    this._q = '';
    this._onBlur();
    this._subject.next('');
    this.cancel.emit();
  }

  _onClear(): void {
    this._q = '';
    this._doFocus();
    this._subject.next('');
    this.clear.emit();
  }

  _onSubmit(e: any): boolean {
    e.preventDefault();
    e.stopPropagation();

    this._subject.next(this._q);
    this.submit.emit(this._q);
    return false;
  }

  ngOnDestroy(): void {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }
}
