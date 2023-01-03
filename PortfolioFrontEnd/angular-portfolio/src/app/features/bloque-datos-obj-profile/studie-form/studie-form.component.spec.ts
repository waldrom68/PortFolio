import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudieFormComponent } from './studie-form.component';

describe('StudieFormComponent', () => {
  let component: StudieFormComponent;
  let fixture: ComponentFixture<StudieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudieFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
