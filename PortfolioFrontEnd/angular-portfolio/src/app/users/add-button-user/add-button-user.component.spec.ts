import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddButtonUserComponent } from './add-button-user.component';

describe('AddButtonUserComponent', () => {
  let component: AddButtonUserComponent;
  let fixture: ComponentFixture<AddButtonUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddButtonUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddButtonUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
