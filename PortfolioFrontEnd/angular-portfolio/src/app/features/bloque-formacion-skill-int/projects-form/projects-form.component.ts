import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { faCheck, faMonument, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

import { Project } from 'src/app/data';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment, Moment} from 'moment';

// const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ProjectsFormComponent implements OnInit {
// PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
flagUserAdmin: boolean = false;
flagUserAdmin$: Observable<boolean>;

@Input() formData: Project;
@Input() title: string;
@Output() onUpdate: EventEmitter<Project> = new EventEmitter()
@Output() cancel: EventEmitter<Project> = new EventEmitter()

faCheck = faCheck;
faTimes = faTimes;

form: FormGroup;

@ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;

constructor( 
  private formBuilder: FormBuilder,
  private dataService: DataService,
  ) { 
    

}

// example-month-picker

setMonthAndYear(normalizedMonthAndYear: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>) {
  const ctrlValue = this.Since().value!;
  ctrlValue.month(normalizedMonthAndYear.month());
  ctrlValue.year(normalizedMonthAndYear.year());
  this.Since().setValue(ctrlValue);
  datepicker.close();
}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name:[this.formData.name, [Validators.required, Validators.minLength(1) ]],
      resume:[this.formData.resume, [Validators.required, Validators.minLength(2), Validators.maxLength(500) ]],
      since:[this.formData.since, [Validators.required ]]

    });
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()
  }

  get Nombre(): any {
    return this.form.get("name")
  }
  get Resume(): any {
    return this.form.get("resume")
  }
  get Since(): any {
    return this.form.get("since")
  }

  resetForm() {
    this.formData.name = "";
    this.formData.resume = "";
    this.formData.since = 0;

  }

  onEnviar(event: Event, ) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.flagUserAdmin) {

      this.cancel.emit();

    } else {
      
      if (this.form.valid) {
  
        this.formData.name = this.form.get("name")?.value;
        this.formData.resume = this.form.get("resume")?.value;
        this.formData.since = this.form.get("since")?.value.year();
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
