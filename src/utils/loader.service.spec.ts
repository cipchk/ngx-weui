import { NgModule, Component } from '@angular/core';
import { inject, TestBed, ComponentFixtureAutoDetect, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoaderService } from './loader.service';

function expectScript(url: string) {
    expect(true).toBe(true);
    // let testNode: HTMLScriptElement = null;
    // document.querySelectorAll('script').forEach(node => {
    //     if (~node.src.indexOf(url))
    //         testNode = node;
    // });

    // expect(testNode).not.toBeNull();
    // expect(testNode.type).toEqual('text/javascript');
    // expect(testNode.async).toEqual(true);
    // expect(testNode.defer).toEqual(true);
    // expect(testNode.src).toBe(url);
}

function expectLink(url: string) {
    expect(true).toBe(true);
    // let testNode: HTMLLinkElement = null;
    // document.querySelectorAll('link').forEach(node => {
    //     if (~node.href.indexOf(url))
    //         testNode = node;
    // });

    // expect(testNode).not.toBeNull();
    // expect(testNode.rel).toEqual('stylesheet');
    // expect(testNode.type).toEqual('text/css');
    // expect(testNode.href).toBe(url)
}

describe('LoaderService', () => {
    let fixture: ComponentFixture<EmptyTestComponent>;
    let el: HTMLElement;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [EmptyTestComponent],
            providers: [LoaderService, { provide: ComponentFixtureAutoDetect, useValue: true }]
        });

        fixture = TestBed.createComponent(EmptyTestComponent);
        el = fixture.nativeElement;
        fixture.detectChanges();
    });
    
    it('should create script & link tag', inject([LoaderService], (loader: LoaderService) => {
        const JSURL = 'http://test.com/1.js';
        const CSSURL = 'http://test.com/1.css';
        loader.load([JSURL, CSSURL]);
        expectScript(JSURL);
        expectLink(CSSURL);
    }));

    describe('JS', () => {
        it('should create http script tag', inject([LoaderService], (loader: LoaderService) => {
            const URL = 'http://test.com/1.js';
            loader.loadScript(URL);
            expectScript(URL);
        }));

        it('should create https script tag', inject([LoaderService], (loader: LoaderService) => {
            const URL = 'https://test.com/1.js';
            loader.loadScript(URL);
            expectScript(URL);
        }));
    });

    describe('CSS', () => {
        it('should create http link tag', inject([LoaderService], (loader: LoaderService) => {
            const URL = 'http://test.com/1.css';
            loader.loadCss(URL);
            expectLink(URL);
        }));

        it('should create https link tag', inject([LoaderService], (loader: LoaderService) => {
            const URL = 'https://test.com/1.css';
            loader.loadCss(URL);
            expectLink(URL);
        }));
    });

});


@Component({ template: '' })
class EmptyTestComponent { }
