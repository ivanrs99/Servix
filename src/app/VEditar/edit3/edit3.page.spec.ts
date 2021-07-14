import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit3Page } from './edit3.page';

describe('Edit3Page', () => {
  let component: Edit3Page;
  let fixture: ComponentFixture<Edit3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Edit3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
