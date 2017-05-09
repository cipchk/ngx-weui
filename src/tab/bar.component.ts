import { Component, Injectable, OnDestroy } from '@angular/core';
import { TabConfig } from './tab.config';
import { TabDirective } from './tab.directive';

@Component({
    selector: 'weui-bar-component',
    template: ``
})
export class BarComponent implements OnDestroy {
    tabs: TabDirective[] = [];
    protected isDestroyed: boolean;

    constructor(config: TabConfig) {
        Object.assign(this, config);
    }

    add(tab: TabDirective) {
        this.tabs.push(tab);
        tab.active = this.tabs.length === 1 && tab.active !== false;
    }

    remove(tab: TabDirective): void {
        let index = this.tabs.indexOf(tab);
        if (index === -1 || this.isDestroyed) {
            return;
        }
        // Select a new tab if the tab to be removed is selected and not destroyed
        if (tab.active && this.hasAvailableTabs(index)) {
            let newActiveIndex = this.getClosestTabIndex(index);
            this.tabs[newActiveIndex].active = true;
        }

        tab.removed.emit(tab);
        this.tabs.splice(index, 1);
    }

    protected getClosestTabIndex(index: number): number {
        let tabsLength = this.tabs.length;
        if (!tabsLength) {
            return -1;
        }

        for (let step = 1; step <= tabsLength; step += 1) {
            let prevIndex = index - step;
            let nextIndex = index + step;
            if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    }

    protected hasAvailableTabs(index: number): boolean {
        let tabsLength = this.tabs.length;
        if (!tabsLength) {
            return false;
        }

        for (let i = 0; i < tabsLength; i += 1) {
            if (!this.tabs[i].disabled && i !== index) {
                return true;
            }
        }
        return false;
    }

    ngOnDestroy(): void {
        this.isDestroyed = true;
    }
}
