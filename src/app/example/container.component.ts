import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'component-container',
    template: `
<div [ngSwitch]="menu.example || menu.id" style="height:100%">
    <example-accordion *ngSwitchCase="'accordion'"></example-accordion>
    <example-button *ngSwitchCase="'button'"></example-button>
    <example-input *ngSwitchCase="'input'"></example-input>
    <example-list *ngSwitchCase="'list'"></example-list>
    <example-slider *ngSwitchCase="'slider'"></example-slider>
    <example-picker *ngSwitchCase="'picker'"></example-picker>
    <example-uploader *ngSwitchCase="'uploader'" [url]="url"></example-uploader>
    <example-article *ngSwitchCase="'article'"></example-article>
    <example-badge *ngSwitchCase="'badge'"></example-badge>
    <example-flex *ngSwitchCase="'flex'"></example-flex>
    <example-footer *ngSwitchCase="'footer'"></example-footer>
    <example-gallery *ngSwitchCase="'gallery'"></example-gallery>
    <example-grid *ngSwitchCase="'grid'"></example-grid>
    <example-icons *ngSwitchCase="'icons'"></example-icons>
    <example-loadmore *ngSwitchCase="'loadmore'"></example-loadmore>
    <example-panel *ngSwitchCase="'panel'"></example-panel>
    <example-preview *ngSwitchCase="'preview'"></example-preview>
    <example-progress *ngSwitchCase="'progress'"></example-progress>
    <example-actionsheet *ngSwitchCase="'actionsheet'"></example-actionsheet>
    <example-dialog *ngSwitchCase="'dialog'"></example-dialog>
    <example-msg *ngSwitchCase="'msg'" [url]="url"></example-msg>
    <example-msg-success *ngSwitchCase="'msg_success'"></example-msg-success>
    <example-msg-fail *ngSwitchCase="'msg_fail'"></example-msg-fail>
    <example-toast *ngSwitchCase="'toast'"></example-toast>
    <example-toptips *ngSwitchCase="'toptips'"></example-toptips>
    <example-popup *ngSwitchCase="'popup'"></example-popup>
    <example-ptr *ngSwitchCase="'ptr'"></example-ptr>
    <example-infiniteloader *ngSwitchCase="'infiniteloader'"></example-infiniteloader>
    <example-navbar *ngSwitchCase="'navbar'"></example-navbar>
    <example-tabbar *ngSwitchCase="'tabbar'"></example-tabbar>
    <example-searchbar *ngSwitchCase="'searchbar'"></example-searchbar>
    <example-sidebar *ngSwitchCase="'sidebar'"></example-sidebar>
    <example-swiper *ngSwitchCase="'swiper'"></example-swiper>
    <example-countdown *ngSwitchCase="'countdown'"></example-countdown>
    <example-gesture-password *ngSwitchCase="'gesture-password'"></example-gesture-password>
    <example-chart-g2 *ngSwitchCase="'chart-g2'"></example-chart-g2>
    <example-map-qq *ngSwitchCase="'map-qq'"></example-map-qq>
    <example-jweixin *ngSwitchCase="'jweixin'"></example-jweixin>
    <example-mask *ngSwitchCase="'mask'"></example-mask>
    <example-rating *ngSwitchCase="'rating'"></example-rating>
    <example-stepper *ngSwitchCase="'stepper'"></example-stepper>
    <example-pagination *ngSwitchCase="'pagination'"></example-pagination>
</div>
    `
})
export class ContainerComponent {

    @Input() url: string = 'example';
    @Input() menu: any = {};
}
