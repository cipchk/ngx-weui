import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TaobaoService {
  constructor(private http: HttpClient) { }

  search(term: string) {
    const params = new URLSearchParams();
    params.set('q', term); // the user's search value
    params.set('code', 'utf-8');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http
      .jsonp(`https://suggest.taobao.com/sug?${params.toString()}`, 'JSONP_CALLBACK')
      .pipe(
        map((response: any) => response.result.map((d: any[]) => d[0]).slice(0, 5)),
      );
  }
}
