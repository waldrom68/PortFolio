import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueFormacionSkillIntComponent } from './bloque-formacion-skill-int.component';

describe('BloqueFormacionSkillIntComponent', () => {
  let component: BloqueFormacionSkillIntComponent;
  let fixture: ComponentFixture<BloqueFormacionSkillIntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloqueFormacionSkillIntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloqueFormacionSkillIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
