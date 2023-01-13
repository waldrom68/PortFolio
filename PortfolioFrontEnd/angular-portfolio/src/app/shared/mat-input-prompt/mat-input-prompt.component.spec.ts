import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputPromptComponent } from './mat-input-prompt.component';

describe('MatInputPromptComponent', () => {
  let component: MatInputPromptComponent;
  let fixture: ComponentFixture<MatInputPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatInputPromptComponent ],
      imports: [ReactiveFormsModule], 
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatInputPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
