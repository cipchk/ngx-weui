import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

    menus: any[] = [
        {
            name: '布局 Layout',
            icon: 'icon_nav_form',
            show: false,
            items: [
                {
                    label: 'Flex',
                    id: 'flex'
                },
                {
                    label: 'Grid',
                    id: 'grid'
                },
                {
                    label: 'Article',
                    id: 'article'
                },
                {
                    label: 'Footer',
                    id: 'footer'
                },
                {
                    label: 'Preview',
                    id: 'preview'
                },
                {
                    label: 'Panel',
                    id: 'panel'
                }
            ]
        },
        {
            name: '导航 Navigation',
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
                },
                {
                    label: 'Popup',
                    id: 'popup'
                },
                {
                    label: 'Pagination 分页器',
                    id: 'pagination'
                }
            ]
        },
        {
            name: '数据录入 Data Entry',
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
                },
                {
                    label: 'Rating',
                    id: 'rating'
                },
                {
                    label: 'Loadmore',
                    id: 'loadmore'
                },
                {
                    label: 'Progress',
                    id: 'progress'
                },
                {
                    label: 'Stepper 步进器',
                    id: 'stepper'
                }
            ]
        },
        {
            name: '数据展示 Data Display',
            icon: 'icon_nav_form',
            show: false,
            items: [
                {
                    label: 'Accordion',
                    id: 'accordion'
                },
                {
                    label: 'Badge',
                    id: 'badge'
                },
                {
                    label: 'Icons',
                    id: 'icons'
                },
                {
                    label: 'List',
                    id: 'list'
                },
                {
                    label: 'Gallery',
                    id: 'gallery'
                },
                {
                    label: 'Swiper',
                    id: 'swiper'
                }
            ]
        },
        {
            name: '操作反馈 Feedback',
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
                }
            ]
        },
        {
            name: '手势 Gesture',
            icon: 'icon_nav_feedback',
            show: false,
            items: [
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
            name: '组合组件 Combination',
            icon: 'icon_nav_search',
            show: false,
            items: [
                {
                    label: 'Search Bar',
                    id: 'searchbar'
                }
            ]
        },
        {
            name: '其他 Other',
            icon: 'icon_nav_layout',
            show: false,
            items: [
                {
                    label: '微信JS-SDK',
                    id: 'jweixin'
                },
                {
                    label: 'Mask',
                    id: 'mask'
                }
            ]
        },
        {
            name: 'Third Party',
            icon: 'icon_nav_layout',
            show: false,
            items: [
                {
                    label: 'Chart G2-Mobile',
                    id: 'chart-g2'
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
                    label: 'QQ Map',
                    id: 'map-qq'
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
