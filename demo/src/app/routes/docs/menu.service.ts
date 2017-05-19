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
                    "icon": 'http://weui.github.io/weui/images/icon_nav_actionSheet.png'
                },
                {
                    "name": "Button",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_button.png'
                },
                {
                    "name": "Article",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_article.png',
                    "api": false
                },
                {
                    "name": "Badge",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api": false
                },
                {
                    "name": "Dialog",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_dialog.png'
                },
                {
                    "name": "Flex",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api": false
                },
                {
                    "name": "Footer",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api": false
                },
                {
                    "name": "Gallery",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png'
                },
                {
                    "name": "Grid",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api": false
                },
                {
                    "name": "Icons",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_icons.png',
                    "api": false
                },
                {
                    "name": "InfiniteLoader",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png'
                },
                {
                    "name": "Input",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api_url": "form"
                },
                {
                    "name": "VCode",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api_url": "form",
                    "example": "input"
                },
                {
                    "name": "Textarea",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api_url": "form",
                    "example": "input"
                },
                {
                    "name": "List",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api_url": "cell"
                },
                {
                    "name": "Swipe",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api_url": "cell",
                    "example": "list"
                },
                {
                    "name": "LoadMore",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png'
                },
                {
                    "name": "Msg",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_msg.png',
                    "api": false
                },
                {
                    "name": "Navbar",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api_url": "tab"
                },
                {
                    "name": "Panel",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api": false
                },
                {
                    "name": "Picker",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png'
                },
                {
                    "name": "CityPicker",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api_url": "picker",
                    "example": "picker"
                },
                {
                    "name": "DatePicker",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api_url": "picker",
                    "example": "picker"
                },
                {
                    "name": "DateTimePicker",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api_url": "picker",
                    "example": "picker"
                },
                {
                    "name": "TimePicker",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api_url": "picker",
                    "example": "picker"
                },
                {
                    "name": "Popup",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png'
                },
                {
                    "name": "Preview",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "api": false
                },
                {
                    "name": "Progress",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_progress.png'
                },
                {
                    "name": "PullToRefresh",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png',
                    "id": 'ptr'
                },
                {
                    "name": "SearchBar",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_search_bar.png'
                },
                {
                    "name": "Slider",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png'
                },
                {
                    "name": "Tabbar",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_tab.png',
                    "api_url": "tab"
                },
                {
                    "name": "Toast",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_toast.png'
                },
                {
                    "name": "Toptips",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png'
                },
                {
                    "name": "Uploader",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png'
                },
                {
                    "name": "Sidebar",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png'
                },
                {
                    "name": "Swiper",
                    "icon": 'http://weui.github.io/weui/images/icon_nav_panel.png'
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
                    "icon": "http://weui.github.io/weui/images/icon_nav_actionSheet.png",
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
