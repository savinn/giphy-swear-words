/* tslint:disable:no-unused-variable */

import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { SearchService } from './search.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service: Search', () => {
  let searchService: SearchService;
  let httpTestingController: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [SearchService],
      imports: [
        HttpClientTestingModule
      ],
    });

    searchService = TestBed.get(SearchService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should expect Search Service to be defined', () => {
    expect(searchService).toBeDefined();
  });

  it('should retrieve gifs', () => {
    const mockData = {
      data: [],
      meta: [],
      pagination: {}
    };
    searchService.getGifs('test').subscribe(response => {
      expect(response).toBeTruthy();
    });
    const req = httpTestingController.expectOne(() => {
      return true;
    });
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });

  it('should check search term and retrieve gifs', fakeAsync(() => {
    const mockData = { result: 'test' };
    searchService.swearWordsCheck('test').subscribe(response => {
      return response;
    });

    const wordRequest = httpTestingController.expectOne(() => {
      return true;
    });
    expect(wordRequest.request.method).toEqual('GET');
    wordRequest.flush(Object(mockData));

    tick(10000);

    const gifRequest = httpTestingController.expectOne(() => {
      return true;
    });
    expect(gifRequest.request.method).toEqual('GET');
    gifRequest.flush({});
  }));
});
