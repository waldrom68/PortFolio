import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestsItemComponent } from './interests-item.component';

describe('InterestsItemComponent', () => {
  let component: InterestsItemComponent;
  let fixture: ComponentFixture<InterestsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
