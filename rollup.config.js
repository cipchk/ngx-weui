import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';

const target = process.env.ROLLUP_TARGET || 'esm';

let globals = {
  '@angular/animations'                 : 'ng.animations',
  '@angular/core'                       : 'ng.core',
  '@angular/common'                     : 'ng.common',
  '@angular/forms'                      : 'ng.forms',
  '@angular/common/http'                : 'ng.common.http',
  '@angular/router'                     : 'ng.router',
  '@angular/platform-browser'           : 'ng.platformBrowser',
  '@angular/platform-server'            : 'ng.platformServer',
  '@angular/platform-browser-dynamic'   : 'ng.platformBrowserDynamic',
  '@angular/platform-browser/animations': 'ng.platformBrowser.animations',
  '@angular/core/testing'               : 'ng.core.testing',
  '@angular/common/testing'             : 'ng.common.testing',
  '@angular/common/http/testing'        : 'ng.common.http.testing',

  'rxjs/BehaviorSubject': 'Rx',
  'rxjs/Observable': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/Subscription': 'Rx',
  'rxjs/operators': 'Rx.Observable.prototype',
  'rxjs/observable/of': 'Rx.Observable',
  'rxjs/observable/zip': 'Rx.Observable',
  'rxjs/observable/fromEvent': 'Rx.Observable',
  'rxjs/observable/FromEventObservable': 'Rx.Observable',
  'rxjs/observable/combineLatest': 'Rx.Observable',
};

let plugins = [
  sourcemaps(),
  resolve(),
];

switch (target) {
  case 'esm':
    Object.assign(globals, {
      'tslib': 'tslib',
    });
    break;
  case 'mumd':
    // @ts-ignore
    plugins.push(uglify());
    break;
}

export default {
  exports  : 'named',
  name     : 'ngxWeUI',
  plugins,
  external : Object.keys(globals),
  globals,
  output: {
      sourcemap: true
  }
}
