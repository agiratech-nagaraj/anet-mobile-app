import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetsPage } from './time-sheets.page';

describe('TimeSheetsPage', () => {
  let component: TimeSheetsPage;
  let fixture: ComponentFixture<TimeSheetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
