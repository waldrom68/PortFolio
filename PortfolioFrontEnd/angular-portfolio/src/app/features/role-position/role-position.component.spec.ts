import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePositionComponent } from './role-position.component';

describe('RolePositionComponent', () => {
  let component: RolePositionComponent;
  let fixture: ComponentFixture<RolePositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolePositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
