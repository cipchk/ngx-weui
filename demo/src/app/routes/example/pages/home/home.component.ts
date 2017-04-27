import { Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'example-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
    title: string = `<img src="./assets/images/logo.png" alt="weui" height="21px" />`;

    menus: any = [
    {
        name: 'Form',
        icon: 'icon_nav_form',
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
        items: [
            {
                label: 'Search Bar',
                to: '/searchbar'
            }
        ]
    }
]

}
