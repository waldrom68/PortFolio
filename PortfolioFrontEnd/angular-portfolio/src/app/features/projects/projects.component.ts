import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import {Project} from '../../data'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  // PENDIENTE DEBE VINCULARSE CON EL LOGUEO
  isAdmin = true;

  // intereses: Intereses[] = INTERESES;
  myData: Project[] = [];

  constructor( private dataService: DataService,) { }

  ngOnInit(): void {
    this.dataService.getProject().subscribe(project =>
      [this.myData = project]
    );
  }

  deleteProject(project: Project) {
    // Este codigo acualiza el array Person para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
     this.dataService.delProject(project).subscribe( (tt)=> {
        // despues de ejecutarse el borrado de la DB, la quitamos del listado de myData
        this.myData = this.myData.filter( (t) => { return t.id !== project.id } )
      }
    );
  }

}
