import { Component, OnInit } from '@angular/core';

import {HardSkill} from '../../../data'
import {HARDSKILL} from '../../../mock-data'

@Component({
  selector: 'app-hard-skills',
  templateUrl: './hard-skills.component.html',
  styleUrls: ['./hard-skills.component.css']
})
export class HardSkillsComponent implements OnInit {
  hardskill: HardSkill[] = HARDSKILL;
  constructor() { }

  ngOnInit(): void {
  }

}
