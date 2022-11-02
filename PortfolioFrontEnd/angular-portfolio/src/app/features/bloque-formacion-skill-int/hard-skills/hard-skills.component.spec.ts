import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardSkillsComponent } from './hard-skills.component';

describe('HardSkillsComponent', () => {
  let component: HardSkillsComponent;
  let fixture: ComponentFixture<HardSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardSkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
