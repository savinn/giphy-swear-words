/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SearchComponent } from './search.component';
import { SearchService } from './search.service';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SearchComponent', () => {
    expect(component).toBeDefined();
  });

  it('should create search input and set value', fakeAsync(() => {
    const de = fixture.debugElement.query(By.css('.search-input'));
    const el = de.nativeElement;
    fixture.detectChanges();

    component.searchTerm = 'My string';

    const event = new Event('input');
    el.dispatchEvent(event);

    tick();

    fixture.detectChanges();

    expect(component.searchTerm).toEqual('My string');
  }));

  it(`Expect service to return gifs on initialization`, () => {
    const mockData = {
      data: [],
      meta: [],
      pagination: {}
    };
    component.ngOnInit();
    let mockSearchService: jasmine.SpyObj<SearchService>;
    mockSearchService = jasmine.createSpyObj('SearchService', ['getGifs']);
    mockSearchService.getGifs.and.returnValue(of(mockData.data));
    mockSearchService.getGifs('').subscribe(gifs => {
      expect(gifs).toEqual(mockData.data);
    });
  });

  it('should check return value of service on search term change', () => {
    const mockData = {
      data: [],
      meta: [],
      pagination: {}
    };
    component.onChange();
    let mockSearchService: jasmine.SpyObj<SearchService>;
    mockSearchService = jasmine.createSpyObj('SearchService', ['swearWordsCheck']);
    mockSearchService.swearWordsCheck.and.returnValue(of(mockData));

    const result = component.gifs;
    expect(result).toEqual(mockData.data);
  });
});
