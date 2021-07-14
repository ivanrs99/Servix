import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Modal3Page } from './modal3.page';

describe('Modal3Page', () => {
  let component: Modal3Page;
  let fixture: ComponentFixture<Modal3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Modal3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Modal3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
