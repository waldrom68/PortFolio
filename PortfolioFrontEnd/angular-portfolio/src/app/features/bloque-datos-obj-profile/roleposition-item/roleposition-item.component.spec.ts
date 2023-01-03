import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolepositionItemComponent } from './roleposition-item.component';

describe('RolepositionItemComponent', () => {
  let component: RolepositionItemComponent;
  let fixture: ComponentFixture<RolepositionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolepositionItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolepositionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
