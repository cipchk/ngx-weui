import { Component, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { isAndroid } from '../utils/browser';
import { ActionSheetData } from './data';
import { ActionSheetConfig } from './actionsheet.config';

@Component({
    selector: 'weui-actionsheet, [weui-actionsheet]',
    template: `
        <div class="weui-mask" [@visibility]="visibility" (click)="hide(true)"></div>
        <div class="weui-actionsheet" [ngClass]="{'weui-actionsheet_toggle': _shownAnt && data.skin === 'ios'}">
            <div class="weui-actionsheet__title" *ngIf="data.skin === 'ios' && data.title">
                <p class="weui-actionsheet__title-text">{{data.title}}</p>
            </div>
            <div class="weui-actionsheet__menu">
                <div class="weui-actionsheet__cell" *ngFor="let item of data.menu" (click)="onSelect(item)">{{item.text}}</div>
            </div>
            <div class="weui-actionsheet__action" *ngIf="data.skin === 'ios' && data.cancel">
                <div class="weui-actionsheet__cell" (click)="hide()">{{data.cancel}}</div>
            </div>
        </div>
    `,
    animations: [trigger('visibility', [
        state('show', style({ opacity: 1 })),
        state('hide', style({ opacity: 0 })),
        transition('hide <=> show', [animate(200)])
    ])],
    host: {
        '[hidden]': '!shown',
        '[class.weui-skin_android]': 'data.skin === "android"'
    }
})
export class ActionSheetComponent implements OnDestroy {

    @Input('weui-data') data: ActionSheetData;
    @Output('weui-close') close = new EventEmitter();

    private shown: boolean = false;
    _shownAnt = false;

    private observer: Observer<any>;

    get visibility(): string {
        return this._shownAnt ? 'show' : 'hide';
    }

    constructor(private DEF: ActionSheetConfig) { }

    show(): Observable<any> {
        this.data = Object.assign({
            backdrop: true,
            skin: 'auto'
        }, this.DEF, this.data);
        if (this.data.skin === 'auto') {
            this.data.skin = isAndroid() ? 'android' : 'ios';
        }
        this.shown = true;
        setTimeout(() => { this._shownAnt = true; }, 10);
        return Observable.create((observer: Observer<any>) => {
            this.observer = observer;
        });
    }

    hide(is_backdrop?: boolean) {
        if (is_backdrop === true && this.data.backdrop === false) return false;
        
        this._shownAnt = false;
        setTimeout(() => { 
            this.shown = false; 
            this.close.emit();
        }, this.data.skin === 'android' ? 200 : 300);
    }

    onSelect(menu: { text?: string, [key: string]: any }) {
        if (this.observer) {
            this.observer.next(menu);
            this.observer.complete();
        }
        this.hide();
    }

    ngOnDestroy(): void {
        if (this.observer && this.observer instanceof Subscription) {
            (<Subscription>this.observer).unsubscribe();
        }
    }

}
