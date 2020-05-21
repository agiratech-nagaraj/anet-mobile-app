import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogTimePage } from './log-time.page';

describe('LogTimePage', () => {
  let component: LogTimePage;
  let fixture: ComponentFixture<LogTimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogTimePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
