/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CareerItemComponent } from './career-item.component';

describe('CareerItemComponent', () => {
  let component: CareerItemComponent;
  let fixture: ComponentFixture<CareerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
