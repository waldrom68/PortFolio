/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ObjetiveItemComponent } from './objetive-item.component';

describe('ObjetiveItemComponent', () => {
  let component: ObjetiveItemComponent;
  let fixture: ComponentFixture<ObjetiveItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjetiveItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetiveItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
