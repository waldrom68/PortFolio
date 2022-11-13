import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDisplayComponent } from './btn-display.component';

describe('BtnDisplayComponent', () => {
  let component: BtnDisplayComponent;
  let fixture: ComponentFixture<BtnDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
