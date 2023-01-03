import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeFormComponent } from './degree-form.component';

describe('DegreeFormComponent', () => {
  let component: DegreeFormComponent;
  let fixture: ComponentFixture<DegreeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
