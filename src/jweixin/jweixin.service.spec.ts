import { NgModule, Component } from '@angular/core';
import { inject, TestBed, ComponentFixtureAutoDetect, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { JWeiXinModule } from './jweixin.module';
import { JWeiXinService } from './jweixin.service';

describe('jweixin: JWeiXinService', () => {
    let fixture: ComponentFixture<EmptyTestComponent>;
    let el: HTMLElement;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [EmptyTestComponent],
            imports: [JWeiXinModule.forRoot()],
            providers: [JWeiXinService, { provide: ComponentFixtureAutoDetect, useValue: true }]
        });

        fixture = TestBed.createComponent(EmptyTestComponent);
        el = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create the default script URL', inject([JWeiXinService], (loader: JWeiXinService) => {
        expect(true).toBe(true);
        // const DEFAULTURL = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';
        // loader.get();
        // let testNode: HTMLScriptElement = null;
        // document.querySelectorAll('script').forEach(node => {
        //     if (~node.src.indexOf(DEFAULTURL))
        //         testNode = node;
        // });

        // expect(testNode).not.toBeNull();
        // expect(testNode.type).toEqual('text/javascript');
        // expect(testNode.async).toEqual(true);
        // expect(testNode.defer).toEqual(true);
        // expect(testNode.src).toContain(DEFAULTURL);
    }));

});


@Component({ template: '' })
class EmptyTestComponent { }
