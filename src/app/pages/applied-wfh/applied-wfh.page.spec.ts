import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedWfhPage } from './applied-wfh.page';

describe('AppliedWfhPage', () => {
  let component: AppliedWfhPage;
  let fixture: ComponentFixture<AppliedWfhPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliedWfhPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedWfhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
