import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Interests } from '../../../data';

@Component({
  selector: 'app-interests-form',
  templateUrl: './interests-form.component.html',
  styleUrls: ['./interests-form.component.css']
})
export class InterestsFormComponent implements OnInit {
  @Input() showForm: boolean;
  @Input() formData: Interests;

  @Output() onUpdate: EventEmitter<Interests> = new EventEmitter()

  form: FormGroup;

  constructor( private formBuilder: FormBuilder, ) { 
    
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name:[this.formData.name, [Validators.required,
        Validators.minLength(5) ]],
    })
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
}
