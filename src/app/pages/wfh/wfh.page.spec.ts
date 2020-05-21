import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfhPage } from './wfh.page';

describe('WfhPage', () => {
  let component: WfhPage;
  let fixture: ComponentFixture<WfhPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfhPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
