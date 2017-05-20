import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

    menus: any[] = [
        {
            name: 'Form',
            icon: 'icon_nav_form',
            show: false,
            items: [
                {
                    label: 'Button',
                    id: 'button'
                },
                {
                    label: 'Input',
                    id: 'input'
                },
                {
                    label: 'List',
                    id: 'list'
                },
                {
                    label: 'Slider',
                    id: 'slider'
                },
                {
                    label: 'Picker',
                    id: 'picker'
                },
                {
                    label: 'Uploader',
                    id: 'uploader'
                }
            ]
        },
        {
            name: 'Basic Components',
            icon: 'icon_nav_layout',
            show: false,
            items: [
                {
                    label: 'Article',
                    id: 'article'
                },
                {
                    label: 'Badge',
                    id: 'badge'
                },
                {
                    label: 'Flex',
                    id: 'flex'
                },
                {
                    label: 'Footer',
                    id: 'footer'
                },
                {
                    label: 'Gallery',
                    id: 'gallery'
                },
                {
                    label: 'Grid',
                    id: 'grid'
                },
                {
                    label: 'Icons',
                    id: 'icons'
                },
                {
                    label: 'Loadmore',
                    id: 'loadmore'
                },
                {
                    label: 'Panel',
                    id: 'panel'
                },
                {
                    label: 'Preview',
                    id: 'preview'
                },
                {
                    label: 'Progress',
                    id: 'progress'
                },
                {
                    label: 'Swiper',
                    id: 'swiper'
                },
                {
                    label: 'Countdown',
                    id: 'countdown'
                },
                {
                    label: 'Gesture Password',
                    id: 'gesture-password'
                },
                {
                    label: 'Chart G2-Mobile',
                    id: 'chart-g2'
                }
            ]
        },
        {
            name: 'Feedbacks',
            icon: 'icon_nav_feedback',
            show: false,
            items: [
                {
                    label: 'Actionsheet',
                    id: 'actionsheet'
                },
                {
                    label: 'Dialog',
                    id: 'dialog'
                },
                {
                    label: 'Msg',
                    id: 'msg'
                },
                {
                    label: 'Msg',
                    id: 'msg_fail',
                    show: false
                },
                {
                    label: 'Msg',
                    id: 'msg_success',
                    show: false
                },
                {
                    label: 'Toast',
                    id: 'toast'
                },
                {
                    label: 'Toptips',
                    id: 'toptips'
                },
                {
                    label: 'Popup',
                    id: 'popup'
                },
                {
                    label: 'Pull To Refresh',
                    id: 'ptr'
                },
                {
                    label: 'Infinite Loader',
                    id: 'infiniteloader'
                }
            ]
        },
        {
            name: 'Navigations',
            icon: 'icon_nav_nav',
            show: false,
            items: [
                {
                    label: 'Navbar',
                    id: 'navbar'
                },
                {
                    label: 'Tabbar',
                    id: 'tabbar'
                },
                {
                    label: 'Sidebar',
                    id: 'sidebar'
                }
            ]
        },
        {
            name: 'Search',
            icon: 'icon_nav_search',
            show: false,
            items: [
                {
                    label: 'Search Bar',
                    id: 'searchbar'
                }
            ]
        }
    ]

    getMenu(id: string) {
        for (let mi of this.menus) {
            const item = mi.items.find(w => w.id === id);
            if (item) return item;
        }
    }
}
