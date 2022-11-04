import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormacionItemComponent } from './formacion-item.component';

describe('FormacionItemComponent', () => {
  let component: FormacionItemComponent;
  let fixture: ComponentFixture<FormacionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormacionItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormacionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
