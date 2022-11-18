import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import {HardSkill} from '../../data'
// import {HARDSKILL} from '../../mock-data'

@Component({
  selector: 'app-hard-skills',
  templateUrl: './hard-skills.component.html',
  styleUrls: ['./hard-skills.component.css']
})
export class HardSkillsComponent implements OnInit {
    // PENDIENTE DEBE VINCULARSE CON EL LOGUEO
    isAdmin = true;

    // hardskill: HardSkill[] = HARDSKILL;
    myData: HardSkill[] = [];
    
  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getHardSkill().subscribe(hardskill =>
      [this.myData = hardskill]
    );
  }

  
  delete(hardskill: HardSkill) {
    // Este codigo acualiza el array Users para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
     this.dataService.delHardSkills(hardskill).subscribe( (tt)=> {
        // despues de ejecutarse el borrado de la DB, la quitamos del listado de Users
        this.myData = this.myData.filter( (t) => { return t.id !== hardskill.id } )
      }
    );
  }

}
