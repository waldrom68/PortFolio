import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import {SoftSkill} from '../../data'
// import {SOFTSKILL} from '../../../mock-data'

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.css']
})
export class SoftSkillsComponent implements OnInit {
  // PENDIENTE DEBE VINCULARSE CON EL LOGUEO
  isAdmin = true;

  // softskill: SoftSkill[] = SOFTSKILL;
  myData: SoftSkill[] = [];

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getSoftSkill().subscribe(skills =>
      [this.myData = skills]
    );
  }

  delete(softskill: SoftSkill) {
    // Este codigo acualiza el array Person para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
     this.dataService.delSoftSkills(softskill).subscribe( (tt)=> {
        // despues de ejecutarse el borrado de la DB, la quitamos del listado de myData
        this.myData = this.myData.filter( (t) => { return t.id !== softskill.id } )
      }
    );
  }

}
