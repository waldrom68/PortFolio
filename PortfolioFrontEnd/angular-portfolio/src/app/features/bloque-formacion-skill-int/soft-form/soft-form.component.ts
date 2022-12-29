import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { faCheck, faTimes, faHand } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

import { SoftSkill } from 'src/app/data';

@Component({
  selector: 'app-soft-form',
  templateUrl: './soft-form.component.html',
  styleUrls: ['./soft-form.component.css']
})
export class SoftFormComponent implements OnInit {
  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;

  @Input() formData: SoftSkill;
  @Input() title:string;
  @Output() onUpdate: EventEmitter<SoftSkill> = new EventEmitter()
  @Output() cancel: EventEmitter<SoftSkill> = new EventEmitter()

  faCheck = faCheck;
  faTimes = faTimes;
  faHand = faHand;

  form: FormGroup;
  minAssessment:number = 0;
  maxAssessment:number = 5;

  constructor( 
    private formBuilder: FormBuilder,
    private dataService: DataService, ) { 
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:[this.formData.name, [Validators.required, Validators.minLength(3) ]],
      assessment:[this.formData.assessment, [Validators.required, Validators.max(this.maxAssessment), Validators.min(this.minAssessment) ]],
    });
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()

  }
  
  color:string = 'red';
  
  changeStyle($event: Event){
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  get Nombre(): any {
    return this.form.get("name")
  }

  get Assessment(): any {
    return this.form.get("assessment")
  }

  resetForm() {
    this.formData.name = "";
    this.formData.assessment = 0;
  }
  onEnviar(event: Event, ) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.flagUserAdmin) {

      this.cancel.emit();

    } else {
      
      if (this.form.valid) {
  
        this.formData.name = this.form.get("name")?.value;
        this.formData.assessment = this.form.get("assessment")?.value;
        this.onUpdate.emit(this.formData);
  
      } else {
        
        console.log("no es valido el valor ingresado")
        this.form.markAllAsTouched();
  
      }
    }

  }

  onCancel(event: Event, ) {
    this.cancel.emit();

  }

}
