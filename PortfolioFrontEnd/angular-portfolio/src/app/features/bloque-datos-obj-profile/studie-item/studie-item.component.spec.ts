import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudieItemComponent } from './studie-item.component';

describe('StudieItemComponent', () => {
  let component: StudieItemComponent;
  let fixture: ComponentFixture<StudieItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudieItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudieItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
