import { Component, ViewEncapsulation, OnDestroy, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { PopupConfig } from './popup.config';

@Component({
    selector: 'weui-popup, [weui-popup]',
    template: `
        <div class="weui-mask" [@visibility]="visibility" (click)="hide(true)"></div>
        <div class="weui-popup" [ngClass]="{'weui-popup_toggle': _shownAnt}">
            <div class="weui-popup__hd" *ngIf="!config.is_full">
                <a href="#" class="weui-popup__action" (click)="onCancel()">{{config.cancel}}</a>
                <a href="#" class="weui-popup__action" (click)="onConfirm()">{{config.confirm}}</a>
            </div>
            <div [ngClass]="{'weui-popup_full': config.is_full }">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [
        `.weui-popup_full{height: 100vh; overflow: scroll;}.weui-popup{position:fixed;left:0;bottom:0;-webkit-transform:translateY(100%);transform:translateY(100%);-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:5000;width:100%;background-color:#efeff4;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-popup_toggle{-webkit-transform:translate(0);transform:translate(0)}.weui-popup__hd{display:-webkit-box;display:-ms-flexbox;display:flex;padding:10px 15px;background-color:#fbf9fe;position:relative;text-align:center}.weui-popup__hd:after{content:" ";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.weui-popup__action{display:block;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#586c94}.weui-popup__action:first-child{text-align:left}.weui-popup__action:last-child{text-align:right}`
    ],
    animations: [trigger('visibility', [
        state('show', style({ opacity: 1 })),
        state('hide', style({ opacity: 0 })),
        transition('hide <=> show', [animate(200)])
    ])],
    host: {
        '[hidden]': '!shown'
    },
    encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnDestroy, OnChanges {
    @Input() config: PopupConfig;
    @Output() cancel = new EventEmitter();
    @Output() confirm = new EventEmitter();

    private shown: boolean = false;
    _shownAnt = false;

    private observer: Observer<boolean>;

    get visibility(): string {
        return this._shownAnt ? 'show' : 'hide';
    }
    
    constructor(private DEF: PopupConfig) {}

    private parseConfig() {
        this.config = Object.assign({ }, this.DEF, this.config);
    }

    ngOnInit() {
        this.parseConfig();
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if ('config' in changes)
            this.parseConfig();
    }

    show(): Observable<boolean> {
        this.shown = true;
        setTimeout(() => { this._shownAnt = true; }, 10);
        return Observable.create((observer: Observer<boolean>) => {
            this.observer = observer;
        });
    }

    hide(is_backdrop?: boolean) {
        if (is_backdrop === true && this.config.backdrop === false) return false;
        
        this._shownAnt = false;
        setTimeout(() => { 
            this.shown = false;
        }, 300);
    }

    close() {
        this.hide(false);
    }

    onCancel() {
        this.cancel.emit();
        this.hide(false);
        return false;
    }

    onConfirm() {
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
            (<Subscription>this.observer).unsubscribe();
        }
    }
}
