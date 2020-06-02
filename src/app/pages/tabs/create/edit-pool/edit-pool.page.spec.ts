import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPoolPage } from './edit-pool.page';

describe('EditPoolPage', () => {
  let component: EditPoolPage;
  let fixture: ComponentFixture<EditPoolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPoolPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPoolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
