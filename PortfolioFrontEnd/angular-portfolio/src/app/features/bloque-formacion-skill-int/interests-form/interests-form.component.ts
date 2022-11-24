import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Interests } from '../../../data';

@Component({
  selector: 'app-interests-form',
  templateUrl: './interests-form.component.html',
  styleUrls: ['./interests-form.component.css']
})
export class InterestsFormComponent implements OnInit {
  @Input() formData: Interests;

  @Output() onUpdate: EventEmitter<Interests> = new EventEmitter()
  @Output() cancel: EventEmitter<Interests> = new EventEmitter()

  faCheck = faCheck;
  faTimes = faTimes;

  form: FormGroup;

  constructor( private formBuilder: FormBuilder, ) { 
    
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name:[this.formData.name, [Validators.required,
        Validators.minLength(5) ]],
    })
  }

  get Nombre(): any {
    return this.form.get("name")
  }

  resetForm() {
    this.formData.name = ""
  }
  onEnviar(event: Event, ) {
    event.preventDefault;
    if (this.form.valid) {

      this.formData.name = this.form.get("name")?.value
      this.onUpdate.emit(this.formData)

    } else {
      
      console.log("no es valido el valor ingresado")
      this.form.markAllAsTouched();

    }
  }

  onCancel(event: Event, ) {
    this.cancel.emit();

  }
}
