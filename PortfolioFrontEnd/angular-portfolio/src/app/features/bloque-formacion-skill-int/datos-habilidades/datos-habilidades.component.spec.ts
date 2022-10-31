import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosHabilidadesComponent } from './datos-habilidades.component';

describe('DatosHabilidadesComponent', () => {
  let component: DatosHabilidadesComponent;
  let fixture: ComponentFixture<DatosHabilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosHabilidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosHabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
