import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedPage } from './booked.page';

describe('BookedPage', () => {
  let component: BookedPage;
  let fixture: ComponentFixture<BookedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
