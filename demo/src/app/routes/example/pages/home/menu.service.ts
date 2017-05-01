import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

    menus: any = [
        {
            name: 'Form',
            icon: 'icon_nav_form',
            isShow: false,
            items: [
                {
                    label: 'Button',
                    to: '/button'
                },
                {
                    label: 'Input',
                    to: '/input'
                },
                {
                    label: 'List',
                    to: '/list'
                },
                {
                    label: 'Slider',
                    to: '/slider'
                },
                {
                    label: 'Uploader',
                    to: '/uploader'
                }
            ]
        },
        {
            name: 'Basic Components',
            icon: 'icon_nav_layout',
            isShow: false,
            items: [
                {
                    label: 'Article',
                    to: '/article'
                },
                {
                    label: 'Badge',
                    to: '/badge'
                },
                {
                    label: 'Flex',
                    to: '/flex'
                },
                {
                    label: 'Footer',
                    to: '/footer'
                },
                {
                    label: 'Gallery',
                    to: '/gallery'
                },
                {
                    label: 'Grid',
                    to: '/grid'
                },
                {
                    label: 'Icons',
                    to: '/icons'
                },
                {
                    label: 'Loadmore',
                    to: '/loadmore'
                },
                {
                    label: 'Panel',
                    to: '/panel'
                },
                {
                    label: 'Preview',
                    to: '/preview'
                },
                {
                    label: 'Progress',
                    to: '/progress'
                }
            ]
        },
        {
            name: 'Feedbacks',
            icon: 'icon_nav_feedback',
            isShow: false,
            items: [
                {
                    label: 'Actionsheet',
                    to: '/actionsheet'
                },
                {
                    label: 'Dialog',
                    to: '/dialog'
                },
                {
                    label: 'Msg',
                    to: '/msg'
                },
                {
                    label: 'Picker',
                    to: '/picker'
                },
                {
                    label: 'Toast',
                    to: '/toast'
                }
            ]
        },
        {
            name: 'Navigations',
            icon: 'icon_nav_nav',
            isShow: false,
            items: [
                {
                    label: 'Navbar',
                    to: '/navbar'
                },
                {
                    label: 'Tabbar',
                    to: '/tabbar'
                }
            ]
        },
        {
            name: 'Search',
            icon: 'icon_nav_search',
            isShow: false,
            items: [
                {
                    label: 'Search Bar',
                    to: '/searchbar'
                }
            ]
        }
    ]
}
