import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftFormComponent } from './soft-form.component';

describe('SoftFormComponent', () => {
  let component: SoftFormComponent;
  let fixture: ComponentFixture<SoftFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
