import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueDatosObjProfileComponent } from './bloque-datos-obj-profile.component';

describe('BloqueDatosObjProfileComponent', () => {
  let component: BloqueDatosObjProfileComponent;
  let fixture: ComponentFixture<BloqueDatosObjProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloqueDatosObjProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloqueDatosObjProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
