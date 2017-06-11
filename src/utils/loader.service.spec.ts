import { NgModule, Component } from '@angular/core';
import { inject, TestBed, ComponentFixtureAutoDetect, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoaderService } from './loader.service';
import { findParent } from './dom';

function expectScript(htmlEl: HTMLElement, url: string) {
    let testNode: HTMLScriptElement = null;
    htmlEl.querySelectorAll('script').forEach(node => {
        if (~node.src.indexOf(url))
            testNode = node;
    });

    expect(testNode).not.toBeNull();
    expect(testNode.type).toEqual('text/javascript');
    expect(testNode.async).toEqual(true);
    expect(testNode.defer).toEqual(true);
    expect(testNode.src).toBe(url);
}

function expectLink(htmlEl: HTMLElement, url: string) {
    let testNode: HTMLLinkElement = null;
    htmlEl.querySelectorAll('link').forEach(node => {
        if (~node.href.indexOf(url))
            testNode = node;
    });

    expect(testNode).not.toBeNull();
    expect(testNode.rel).toEqual('stylesheet');
    expect(testNode.type).toEqual('text/css');
    expect(testNode.href).toBe(url)
}

describe('LoaderService', () => {
    let fixture: ComponentFixture<EmptyTestComponent>;
    let el: HTMLElement;
    let htmlEl: HTMLElement;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [EmptyTestComponent],
            providers: [LoaderService, { provide: ComponentFixtureAutoDetect, useValue: true }]
        });

        fixture = TestBed.createComponent(EmptyTestComponent);
        el = fixture.nativeElement;
        fixture.detectChanges();
        htmlEl = findParent(el, 'html');
    });
    
    it('should create script & link tag', inject([LoaderService], (loader: LoaderService) => {
        const JSURL = 'http://test.com/1.js';
        const CSSURL = 'http://test.com/1.css';
        loader.load([JSURL, CSSURL]);
        expectScript(htmlEl, JSURL);
        expectLink(htmlEl, CSSURL);
    }));

    describe('JS', () => {
        it('should create http script tag', inject([LoaderService], (loader: LoaderService) => {
            const URL = 'http://test.com/1.js';
            loader.loadScript(URL);
            expectScript(htmlEl, URL);
        }));

        it('should create https script tag', inject([LoaderService], (loader: LoaderService) => {
            const URL = 'https://test.com/1.js';
            loader.loadScript(URL);
            expectScript(htmlEl, URL);
        }));
    });

    describe('CSS', () => {
        it('should create http link tag', inject([LoaderService], (loader: LoaderService) => {
            const URL = 'http://test.com/1.css';
            loader.loadCss(URL);
            expectLink(htmlEl, URL);
        }));

        it('should create https link tag', inject([LoaderService], (loader: LoaderService) => {
            const URL = 'https://test.com/1.css';
            loader.loadCss(URL);
            expectLink(htmlEl, URL);
        }));
    });

});


@Component({ template: '' })
class EmptyTestComponent { }
