import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PooldetailPage } from './pooldetail.page';

describe('PooldetailPage', () => {
  let component: PooldetailPage;
  let fixture: ComponentFixture<PooldetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PooldetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PooldetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
