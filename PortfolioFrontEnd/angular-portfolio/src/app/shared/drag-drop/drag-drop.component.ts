import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})



export class DragDropComponent implements OnInit, OnDestroy {
// https://material.angular.io/cdk/drag-drop/overview
// https://blog.openreplay.com/drag-and-drop-with-angular-material/
// https://www.positronx.io/angular-drag-and-drop-tutorial-with-example/

Movies = [
  'Blade Runner',
  'Cool Hand Luke',
  'Heat',
  'Juice',
  'The Far Side of the World',
  'Morituri',
  'Napoleon Dynamite',
  'Pulp Fiction'
];
drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.Movies, event.previousIndex, event.currentIndex);
  console.log(this.Movies);
  
}

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }


}
