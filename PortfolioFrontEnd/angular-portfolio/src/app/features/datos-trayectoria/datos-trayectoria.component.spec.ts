import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTrayectoriaComponent } from './datos-trayectoria.component';

describe('DatosTrayectoriaComponent', () => {
  let component: DatosTrayectoriaComponent;
  let fixture: ComponentFixture<DatosTrayectoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosTrayectoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosTrayectoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
