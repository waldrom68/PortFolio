import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresesComponent } from './intereses.component';

describe('InteresesComponent', () => {
  let component: InteresesComponent;
  let fixture: ComponentFixture<InteresesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteresesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteresesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
