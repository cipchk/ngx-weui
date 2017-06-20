import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {
    menus: any = [
        {
            "id": "1",
            "name": {
                "en-US": "Start",
                "zh-CN": "开始"
            },
            "icon": "star-o",
            "type": "page",
            "link": "start"
        },
        {
            "id": "2",
            "name": {
                "en-US": "Components",
                "zh-CN": "组件"
            },
            "icon": "th",
            "type": "menu",
            "link": "components",
            "items": [
                {
                    "name": "ActionSheet",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_actionSheet.png'
                },
                {
                    "name": "Button",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_button.png'
                },
                {
                    "name": "Article",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_article.png',
                    "api": false
                },
                {
                    "name": "Badge",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api": false
                },
                {
                    "name": "Dialog",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_dialog.png'
                },
                {
                    "name": "Flex",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api": false
                },
                {
                    "name": "Footer",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api": false
                },
                {
                    "name": "Gallery",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    "name": "Grid",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api": false
                },
                {
                    "name": "Icons",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_icons.png',
                    "api": false
                },
                {
                    "name": "InfiniteLoader",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    "name": "Input",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api_url": "form",
                    "example": "input"
                },
                {
                    "name": "VCode",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api_url": "form",
                    "example": "input"
                },
                {
                    "name": "Textarea",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api_url": "form",
                    "example": "input"
                },
                {
                    "name": "List",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api_url": "cell"
                },
                {
                    "name": "LoadMore",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    "name": "Msg",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_msg.png',
                    "api": false
                },
                {
                    "name": "Navbar",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api_url": "tab"
                },
                {
                    "name": "Panel",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api": false
                },
                {
                    "name": "Picker",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    "name": "CityPicker",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api_url": "picker",
                    "example": "picker"
                },
                {
                    "name": "DatePicker",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api_url": "picker",
                    "example": "picker"
                },
                {
                    "name": "DateTimePicker",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api_url": "picker",
                    "example": "picker"
                },
                {
                    "name": "TimePicker",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api_url": "picker",
                    "example": "picker"
                },
                {
                    "name": "Popup",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    "name": "Preview",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api": false
                },
                {
                    "name": "Progress",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_progress.png'
                },
                {
                    "name": "PullToRefresh",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api_url": "ptr",
                    "example": 'ptr'
                },
                {
                    "name": "SearchBar",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_search_bar.png'
                },
                {
                    "name": "Slider",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    "name": "Tabbar",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_tab.png',
                    "api_url": "tab"
                },
                {
                    "name": "Toast",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_toast.png'
                },
                {
                    "name": "Toptips",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    "name": "Uploader",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    "name": "Sidebar",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png'
                },
                {
                    "name": "Swiper",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "doc_overview": true
                },
                {
                    "name": "Countdown",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "doc_overview": true,
                    "api": false
                },
                {
                    "name": "Gesture Password",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api_url": "gesture-password",
                    "example": "gesture-password",
                    "doc_overview": true,
                    "api": false
                },
                {
                    "name": "Chart G2-Mobile",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api_url": "chart-g2",
                    "example": "chart-g2",
                    "doc_overview": true
                },
                {
                    "name": "QQ Map",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api_url": "map-qq",
                    "example": "map-qq",
                    "doc_overview": true,
                    "api": false
                },
                {
                    "name": "微信JS-SDK",
                    "icon": '//cipchk.github.io/ngx-weui/assets/images/icon_nav_panel.png',
                    "api_url": "jweixin",
                    "example": "jweixin",
                    "doc_overview": true
                }
            ]
        },
        {
            "id": "3",
            "name": {
                "en-US": "FAQ",
                "zh-CN": "常见问题"
            },
            "icon": "book",
            "type": "menu",
            "link": "faq",
            "items": [
                {
                    "name": {
                        "en-US": "Get Started",
                        "zh-CN": "开始使用"
                    },
                    "icon": "//cipchk.github.io/ngx-weui/assets/images/icon_nav_actionSheet.png",
                    "guide": {
                        "en-US": "getstarted.en-US.md",
                        "zh-CN": "getstarted.zh-CN.md"
                    }
                }
            ]
        }
    ]

    getItems(linkId: string): any[] {
        for (let item of this.menus) {
            if (item.link === linkId)
                return Object.assign([], item.items);
        }
        return [];
    }
}
