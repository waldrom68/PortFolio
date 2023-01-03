import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolepositionFormComponent } from './roleposition-form.component';

describe('RolepositionFormComponent', () => {
  let component: RolepositionFormComponent;
  let fixture: ComponentFixture<RolepositionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolepositionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolepositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
