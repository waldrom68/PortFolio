import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetiveComponent } from './objetive.component';

describe('ObjetiveComponent', () => {
  let component: ObjetiveComponent;
  let fixture: ComponentFixture<ObjetiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjetiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
