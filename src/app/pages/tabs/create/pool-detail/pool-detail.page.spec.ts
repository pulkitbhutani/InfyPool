import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolDetailPage } from './pool-detail.page';

describe('PoolDetailPage', () => {
  let component: PoolDetailPage;
  let fixture: ComponentFixture<PoolDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
