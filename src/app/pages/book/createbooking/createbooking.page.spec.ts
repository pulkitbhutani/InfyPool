import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebookingPage } from './createbooking.page';

describe('CreatebookingPage', () => {
  let component: CreatebookingPage;
  let fixture: ComponentFixture<CreatebookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatebookingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatebookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
