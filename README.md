# ngx-weui [![NPM version](https://img.shields.io/npm/v/ngx-weui.svg)](https://www.npmjs.com/package/ngx-weui) [![npm downloads](https://img.shields.io/npm/dm/ngx-weui.svg)](https://npmjs.org/ngx-weui)

[WeUI](https://github.com/weui/weui) Components build with [Angular](https://angular.io/).


[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide) [![Build Status](https://travis-ci.org/cipchk/ngx-weui.svg?branch=master)](https://travis-ci.org/cipchk/ngx-weui) [![codecov](https://codecov.io/gh/cipchk/ngx-weui/branch/master/graph/badge.svg)](https://codecov.io/gh/cipchk/ngx-weui)

## Table of Contents

1. [Usage & Demo](#usage--demo)
2. [Installation instructions](#installation-instructions)
3. [API Docs](https://cipchk.github.io/ngx-weui/)
4. [Global Config](https://github.com/cipchk/ngx-weui/blob/master/docs/config.md)
5. [Troubleshooting](#troubleshooting)
4. [License](#license)

## Usage & Demo

[Documentation](https://cipchk.github.io/ngx-weui/) & [Live Demo](https://cipchk.github.io/ngx-weui/)。

## Installation instructions

Install `ngx-weui` from `npm`

```bash
npm install ngx-weui --save
```

You will need weui styles

```html
<!-- index.html -->
<link href="//res.wx.qq.com/open/libs/weui/1.1.2/weui.min.css" rel="stylesheet">
```

Import the `ngx-weui` in to your root `AppModule`.

```typescript
import { WeUiModule } from 'ngx-weui';

@NgModule({
    imports: [ WeUiModule.forRoot() ]
})
export class AppModule { }
```

please refer to more [details](https://github.com/cipchk/ngx-weui/blob/master/docs/install.md).

### How to use it with:

+ `angular-cli` please refer to [install](https://github.com/cipchk/ngx-weui/blob/master/docs/install.md).
+ `plnkr` sample available [here](http://plnkr.co/edit/tpl:vrb1b6KrhvyqyCFXQ7zg).

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ngx-weui/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ngx-weui/blob/master/LICENSE) file for the full text)
