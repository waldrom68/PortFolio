import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardFormComponent } from './hard-form.component';

describe('HardFormComponent', () => {
  let component: HardFormComponent;
  let fixture: ComponentFixture<HardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
