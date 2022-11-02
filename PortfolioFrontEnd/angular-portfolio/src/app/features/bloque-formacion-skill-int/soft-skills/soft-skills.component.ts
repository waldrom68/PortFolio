import { Component, OnInit } from '@angular/core';

import {SoftSkill} from '../../../data'
import {SOFTSKILL} from '../../../mock-data'

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.css']
})
export class SoftSkillsComponent implements OnInit {
  softskill: SoftSkill[] = SOFTSKILL;
  constructor() { }

  ngOnInit(): void {
  }

}
