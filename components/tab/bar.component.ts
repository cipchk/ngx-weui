import { Component, OnDestroy } from '@angular/core';
import { TabDirective } from './tab.directive';

@Component({
  selector: 'weui-bar-component',
  template: ``,
})
export class BarComponent implements OnDestroy {
  tabs: TabDirective[] = [];
  protected isDestroyed: boolean;

  add(tab: TabDirective) {
    this.tabs.push(tab);
    tab.active = this.tabs.length === 1 && tab.active !== false;
  }

  remove(tab: TabDirective): void {
    const index = this.tabs.indexOf(tab);
    if (index === -1 || this.isDestroyed) {
      return;
    }
    // Select a new tab if the tab to be removed is selected and not destroyed
    if (tab.active && this.hasAvailableTabs(index)) {
      const newActiveIndex = this.getClosestTabIndex(index);
      this.tabs[newActiveIndex].active = true;
    }

    tab.removed.emit(tab);
    this.tabs.splice(index, 1);
  }

  setActive(tab: TabDirective) {
    tab.active = true;
    tab.select.emit(tab);
  }

  protected getClosestTabIndex(index: number): number {
    const tabsLength = this.tabs.length;
    if (!tabsLength) {
      return -1;
    }

    for (let step = 1; step <= tabsLength; step += 1) {
      const prevIndex = index - step;
      const nextIndex = index + step;
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
    const tabsLength = this.tabs.length;
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
