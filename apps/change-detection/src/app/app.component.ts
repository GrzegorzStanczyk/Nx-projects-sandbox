import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nx-projects-sandbox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'change-detection';

  ngOnChanges() {
    console.log('root changes');
  }

  shapes = [
    {
      id: 0,
      position: { x: 0, y: 0 },
      coords: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
    },
    {
      id: 0,
      position: { x: 0, y: 0 },
      coords: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
    },
    {
      id: 0,
      position: { x: 0, y: 0 },
      coords: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
    }
  ];

  changeData() {
    this.shapes[0].coords[0].x = 10;
  }
  changeData2() {
    this.shapes[0].coords[0].x = 0;
  }
}
