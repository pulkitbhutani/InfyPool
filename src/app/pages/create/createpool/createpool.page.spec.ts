import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepoolPage } from './createpool.page';

describe('CreatepoolPage', () => {
  let component: CreatepoolPage;
  let fixture: ComponentFixture<CreatepoolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepoolPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepoolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
