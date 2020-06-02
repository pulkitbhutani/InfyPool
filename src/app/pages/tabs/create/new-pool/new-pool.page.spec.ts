import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPoolPage } from './new-pool.page';

describe('NewPoolPage', () => {
  let component: NewPoolPage;
  let fixture: ComponentFixture<NewPoolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPoolPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPoolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
