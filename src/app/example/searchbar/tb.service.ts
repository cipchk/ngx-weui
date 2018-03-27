// #docregion
import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class TaobaoService {
  constructor(private jsonp: Jsonp) {}

  search (term: string) {

    let url = 'https://suggest.taobao.com/sug';

    // #docregion search-parameters
    let params = new URLSearchParams();
    params.set('q', term); // the user's search value
    params.set('code', 'utf-8');
    params.set('callback', 'JSONP_CALLBACK');
    // #enddocregion search-parameters

    // #docregion call-jsonp
    // TODO: Add error handling
    return this.jsonp
               .get(url, { search: params })
               .map(response => response.json().result.map((d: any[]) => { return d[0] }).slice(0, 5));
    // #enddocregion call-jsonp
  }
}
