/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SoftItemComponent } from './soft-item.component';

describe('SoftItemComponent', () => {
  let component: SoftItemComponent;
  let fixture: ComponentFixture<SoftItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
