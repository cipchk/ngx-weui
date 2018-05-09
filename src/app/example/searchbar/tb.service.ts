// #docregion
import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TaobaoService {
  constructor(private jsonp: Jsonp) {}

  search(term: string) {
    const url = 'https://suggest.taobao.com/sug';

    // #docregion search-parameters
    const params = new URLSearchParams();
    params.set('q', term); // the user's search value
    params.set('code', 'utf-8');
    params.set('callback', 'JSONP_CALLBACK');
    // #enddocregion search-parameters

    // #docregion call-jsonp
    // TODO: Add error handling
    return this.jsonp.get(url, { search: params }).pipe(
      map(response =>
        response
          .json()
          .result.map((d: any[]) => {
            return d[0];
          })
          .slice(0, 5),
      ),
    );
    // #enddocregion call-jsonp
  }
}
