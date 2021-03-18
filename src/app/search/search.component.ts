import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { take, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  public searchTerm = '';
  gifs = [];

  constructor(private searchService: SearchService) { }

  public ngOnInit(): void {
    this.searchService.getGifs(this.searchTerm).pipe(take(1)).subscribe(res => {
      this.gifs = res;
    });
  }

  public onChange(event?: any) {
    this.searchService.swearWordsCheck(this.searchTerm, event ? event.pageIndex : undefined)
      .pipe(take(1),
        debounceTime(1000))
      .subscribe(res => {
        if (res) {
          this.gifs = res;
        }
      });
  }

}
