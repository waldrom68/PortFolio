import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresItemComponent } from './interes-item.component';

describe('InteresItemComponent', () => {
  let component: InteresItemComponent;
  let fixture: ComponentFixture<InteresItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteresItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteresItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
