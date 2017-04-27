# ngx-weui
weui for angular（[UMeditor](https://github.com/cipchk/ngx-umeditor)）

[![NPM version](https://img.shields.io/npm/v/ngx-weui.svg)](https://www.npmjs.com/package/ngx-weui)
[![Build Status](https://travis-ci.org/cipchk/ngx-weui.svg?branch=master)](https://travis-ci.org/cipchk/ngx-weui)


## Demo

[Live Demo](https://cipchk.github.io/ngx-weui/)

## Components

斜体表示正在开发中……

+ Button
+ Cell
+ Flex
+ _Form_
    + _Input_
    + _Radio_
    + _Checkbox_
    + _Select_
    + _Slider_
    + _Switch_
    + _Textarea_
    + _VCode_
    + _Uploader_
    + _Agreement_
    + _Preview_
+ _ActionSheet_
+ _Article_
+ _Badge_
+ _Dialog_
+ _Footer_
+ _Gallery_
+ _Grid_
+ _Icon_
+ _InfiniteLoader_
+ _PullToRefresh_
+ _Label_
+ _Loadmore_
+ _Mask_
+ _Mediabox_
+ _Msg_
+ _Panel_
+ _Picker_
+ _Popup_
+ _Progress_
+ _SearchBox_
+ _Tab_
+ _Toast_
+ _Toptips_


## 使用

### 1、安装

```
npm install ngx-weui --save
```

把 `UEditorModule` 模块导入到你项目中。

```typescript
import { UEditorModule } from 'ngx-weui';

@NgModule({
    imports: [ 
        BrowserModule,
        UEditorModule.forRoot({
            // 指定ueditor.js路径目录
            path: 'assets/ueditor/',
            // 默认全局配置项
            options: {
                themePath: '/assets/ueditor/themes/'
            }
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2、使用

```html
<ueditor [(ngModel)]="full_source" 
         [config]="{...}"
         [loadingTip]="'加载中……'"
         (onReady)=""
         (onDestroy)=""
         (onContentChange)=""></ueditor>
```

| 名称    | 类型           | 默认值  | 描述 |
| ------- | ------------- | ----- | ----- |
| config | Object |  | 前端配置项说明，[见官网](http://fex.baidu.com/ueditor/#start-config) |
| loadingTip | string | 加载中... | 初始化提示文本。 |
| onPreReady | Function |  | 编辑器准备就绪之前会触发该事件，并会传递 `UEditorComponent` 当前实例对象，可用于后续操作（比如：二次开发前的准备）。 |
| onReady | Function |  | 编辑器准备就绪后会触发该事件，并会传递 `UEditorComponent` 当前实例对象，可用于后续操作。 |
| onDestroy | Function |  | **编辑器组件销毁**后会触发该事件 |
| onContentChange | Function |  | 编辑器内容发生改变时会触发该事件 |

### 3、关于懒加载

懒加载在未到 `wdinow.UE` 时会启动，如果你在 `index.html` 已经使用 `<script src="ueditor.all.js"></script>` 加载过，懒加载流程将会失效。

**加载语言注意点**

懒加载会自动识别并引用，否则，需要自行在 `<head>` 加入语言版本脚本。

## 访问ueditor实例对象

首先，需要给组件定义一下模板变量：

```html
<ueditor [(ngModel)]="full_source" #full></ueditor>
```

使用 `@ViewChild` 访问组件，并使用 `this.full.Instance` 访问ueditor实例对象。

```typescript
export class DemoComponent {
    @ViewChild('full') full: UEditorComponent;
    constructor(private el: ElementRef) {}

    getAllHtml() {
        // 通过 `this.full.Instance` 访问ueditor实例对象
        alert(this.full.Instance.getAllHtml())
    }
}
```

## 事件

虽说上节也可以直接注册ueditor事件，但当组件被销毁时可能会引发内存泄露。所以**不建议直接在ueditor实例中这么做**。组件本身提供 `addListener` 和 `removeListener` 来帮你处理。

```typescript
// 事件监听
this.full.addListener('focus', () => {
    this.focus = `fire focus in ${new Date().getTime()}`;
});
// 事件移除
this.full.removeListener('focus');
```

## 二次开发

**onPreReady**

`onPreReady` 是指在UEditor创建前会触发；因此，可以利用这个事件做一些针对二次开发的准备工作。比如，针对本实例创建自定义一个按钮：

```html
<ueditor [(ngModel)]="custom_source" (onPreReady)="onPreReady($event)" [config]="custom"></ueditor>
```

```typescript
onPreReady(comp: UEditorComponent) {
    UE.registerUI('button', function(editor, uiName) {
        //注册按钮执行时的command命令，使用命令默认就会带有回退操作
        editor.registerCommand(uiName, {
            execCommand: function() {
                alert('execCommand:' + uiName)
            }
        });
        //创建一个button
        var btn = new UE.ui.Button({
            //按钮的名字
            name: uiName,
            //提示
            title: uiName,
            //添加额外样式，指定icon图标，这里默认使用一个重复的icon
            cssRules: 'background-position: -500px 0;',
            //点击时执行的命令
            onclick: function() {
                //这里可以不用执行命令,做你自己的操作也可
                editor.execCommand(uiName);
            }
        });
        //当点到编辑内容上时，按钮要做的状态反射
        editor.addListener('selectionchange', function() {
            var state = editor.queryCommandState(uiName);
            if (state == -1) {
                btn.setDisabled(true);
                btn.setChecked(false);
            } else {
                btn.setDisabled(false);
                btn.setChecked(state);
            }
        });
        //因为你是添加button,所以需要返回这个button
        return btn;
    }, 5, comp.id);
    // comp.id 是指当前UEditor实例Id
}

```

**Hook**

hook调用会在UE加载完成后，UEditor初始化前调用，而且这个整个APP中只会调用一次，通过这个勾子可以做全局性的二次开发。

```typescript
UEditorModule.forRoot({
    path: 'assets/ueditor/',
    options: {
        themePath: '/assets/ueditor/themes/'
    },
    hook: (UE: any): void => {
        // button 自定义按钮将在所有实例中有效。
        UE.registerUI('button', function(editor, uiName) {
            //注册按钮执行时的command命令，使用命令默认就会带有回退操作
            editor.registerCommand(uiName, {
                execCommand: function() {
                    alert('execCommand:' + uiName)
                }
            });
            //创建一个button
            var btn = new UE.ui.Button({
                //按钮的名字
                name: uiName,
                //提示
                title: uiName,
                //添加额外样式，指定icon图标，这里默认使用一个重复的icon
                cssRules: 'background-position: -500px 0;',
                //点击时执行的命令
                onclick: function() {
                    //这里可以不用执行命令,做你自己的操作也可
                    editor.execCommand(uiName);
                }
            });
            //当点到编辑内容上时，按钮要做的状态反射
            editor.addListener('selectionchange', function() {
                var state = editor.queryCommandState(uiName);
                if (state == -1) {
                    btn.setDisabled(true);
                    btn.setChecked(false);
                } else {
                    btn.setDisabled(false);
                    btn.setChecked(state);
                }
            });
            //因为你是添加button,所以需要返回这个button
            return btn;
        });
    }
})

```


## 表单非空校验

组件加入 `required` 当编辑器为空时会处于 `ng-invalid` 状态，具体体验见[Live Demo](https://cipchk.github.io/ngx-weui/)。

## 组件接口

```typescript
interface UEditorComponent {
    /**
     * 获取UE实例
     * 
     * @readonly
     */
    get Instance(): any;

        /**
     * 设置编辑器语言
     * 
     * @param {('zh-cn' | 'en')} lang 
     */
    setLanguage(lang: 'zh-cn' | 'en') {}

    /**
     * 添加编辑器事件
     */
    addListener(eventName: 'destroy' | 'reset' | 'focus' | 'langReady' | 'beforeExecCommand' | 'afterExecCommand' | 'firstBeforeExecCommand' | 'beforeGetContent' | 'afterGetContent' | 'getAllHtml' | 'beforeSetContent' | 'afterSetContent' | 'selectionchange' | 'beforeSelectionChange' | 'afterSelectionChange', 
                fn: Function): void {}

    /**
     * 移除编辑器事件
     * 
     * @param {('destroy' | 'reset' | 'focus' | 'langReady' | 'beforeExecCommand' | 'afterExecCommand' | 'firstBeforeExecCommand' | 'beforeGetContent' | 'afterGetContent' | 'getAllHtml' | 'beforeSetContent' | 'afterSetContent' | 'selectionchange' | 'beforeSelectionChange' | 'afterSelectionChange')} eventName 
     */
    removeListener(eventName: 'destroy' | 'reset' | 'focus' | 'langReady' | 'beforeExecCommand' | 'afterExecCommand' | 'firstBeforeExecCommand' | 'beforeGetContent' | 'afterGetContent' | 'getAllHtml' | 'beforeSetContent' | 'afterSetContent' | 'selectionchange' | 'beforeSelectionChange' | 'afterSelectionChange'): void {}
}
```

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ngx-weui/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ngx-weui/blob/master/LICENSE) file for the full text)
