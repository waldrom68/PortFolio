import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsItemComponent } from './projects-item.component';

describe('ProjectsItemComponent', () => {
  let component: ProjectsItemComponent;
  let fixture: ComponentFixture<ProjectsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
