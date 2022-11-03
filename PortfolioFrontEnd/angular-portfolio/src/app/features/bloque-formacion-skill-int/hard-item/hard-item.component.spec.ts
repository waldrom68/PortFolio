import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardItemComponent } from './hard-item.component';

describe('HardItemComponent', () => {
  let component: HardItemComponent;
  let fixture: ComponentFixture<HardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
