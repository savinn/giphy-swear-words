import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private giphyUrl = `https://api.giphy.com/v1/gifs/search`;
  private swearWordsUrl = `https://www.purgomalum.com/service/json`;

  constructor(private http: HttpClient) { }

  public getGifs(searchTerm: string, pageIndex?: number): Observable<any> {
    searchTerm = this.validateSearchTerm(searchTerm);
    return this.http.get(this.giphyUrl, {
      params: {
        api_key: 'CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6',
        q: `${searchTerm}`,
        limit: '8',
        offset: `${pageIndex ? pageIndex * 50 : 0}`,
        rating: 'g',
        lang: 'en',
        weirdness: '6'
      }
    // tslint:disable-next-line:no-string-literal
    }).pipe(map(res => res['data']));
  }

  public swearWordsCheck(word: string, pageIndex?: number): Observable<any> {
    word = this.validateSearchTerm(word);
    return this.http.get(this.swearWordsUrl, {
      params: {
        text: `${word}`
      }
    }).pipe(switchMap(res => {
      // tslint:disable-next-line:no-string-literal
      if (!res['result'].includes('*')) {
        return this.getGifs(word, pageIndex);
      }
    }));
  }

  private validateSearchTerm(searchTerm: string): string {
    return searchTerm.trim() === '' ? 'hello' : searchTerm;
  }

}
