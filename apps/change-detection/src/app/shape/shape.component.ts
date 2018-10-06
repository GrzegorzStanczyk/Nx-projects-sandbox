import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'nx-projects-sandbox-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit, OnChanges {
  @Input() shape;
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    console.log('shape changes');
  }
}
