import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {
    menus: any = [
        {
            'id': '1',
            'name': {
                'en-US': 'Start',
                'zh-CN': '开始'
            },
            'icon': 'star-o',
            'type': 'page',
            'link': 'start'
        },
        {
            'id': '2',
            'name': {
                'en-US': 'Components',
                'zh-CN': '组件'
            },
            'icon': 'th',
            'type': 'menu',
            'link': 'components',
            'items': [
                {
                    'name': 'ActionSheet',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_actionSheet.png'
                },
                {
                    'name': 'Accordion',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_actionSheet.png'
                },
                {
                    'name': 'Button',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_button.png'
                },
                {
                    'name': 'Article',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_article.png'
                },
                {
                    'name': 'Badge',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Dialog',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_dialog.png'
                },
                {
                    'name': 'Mask',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_dialog.png'
                },
                {
                    'name': 'Flex',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Footer',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Gallery',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Grid',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',

                },
                {
                    'name': 'Icons',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_icons.png'
                },
                {
                    'name': 'InfiniteLoader',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Input',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'form',
                    'example': 'input'
                },
                {
                    'name': 'VCode',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'form',
                    'example': 'input'
                },
                {
                    'name': 'Textarea',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'form',
                    'example': 'input'
                },
                {
                    'name': 'List',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'cell'
                },
                {
                    'name': 'LoadMore',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Msg',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_msg.png'
                },
                {
                    'name': 'Navbar',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'tab'
                },
                {
                    'name': 'Panel',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Picker',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'CityPicker',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'picker',
                    'example': 'picker'
                },
                {
                    'name': 'DatePicker',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'picker',
                    'example': 'picker'
                },
                {
                    'name': 'DateTimePicker',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'picker',
                    'example': 'picker'
                },
                {
                    'name': 'TimePicker',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'picker',
                    'example': 'picker'
                },
                {
                    'name': 'Popup',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Preview',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Progress',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_progress.png'
                },
                {
                    'name': 'PullToRefresh',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'ptr',
                    'example': 'ptr'
                },
                {
                    'name': 'SearchBar',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_search_bar.png'
                },
                {
                    'name': 'Slider',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Tabbar',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_tab.png',
                    'api': 'tab'
                },
                {
                    'name': 'Toast',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_toast.png'
                },
                {
                    'name': 'Toptips',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Rating',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Uploader',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Sidebar',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Stepper 步进器',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'stepper',
                    'example': 'stepper'
                },
                {
                    'name': 'Pagination 分页器',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'pagination',
                    'example': 'pagination'
                },
                {
                    'name': 'Swiper',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Countdown',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    'name': 'Gesture Password',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'gesture-password',
                    'example': 'gesture-password'
                },
                {
                    'name': 'Chart G2-Mobile',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'chart-g2',
                    'example': 'chart-g2'
                },
                {
                    'name': 'QQ Map',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'map-qq',
                    'example': 'map-qq'
                },
                {
                    'name': '微信JS-SDK',
                    'icon': '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    'api': 'jweixin',
                    'example': 'jweixin'
                }
            ]
        },
        {
            'id': '3',
            'name': {
                'en-US': 'FAQ',
                'zh-CN': '常见问题'
            },
            'icon': 'book',
            'type': 'menu',
            'link': 'docs',
            'items': [
                {
                    'id': 'how',
                    'name': '如何使用？'
                },
                {
                    'id': 'config',
                    'name': '全局默认配置'
                },
                {
                    'id': 'style',
                    'name': 'ngx-weui 样式'
                }
            ]
        }
    ];

    getItems(linkId: string): any[] {
        for (const item of this.menus) {
            if (item.link === linkId)
                return Object.assign([], item.items);
        }
        return [];
    }
}
