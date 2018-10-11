import {
  Component,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { BoxComponent } from './box/box.component';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component({
  selector: 'nx-projects-sandbox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  currentBoxComponent: BoxComponent = null;
  boxes = [];
  offsetX;
  offsetY;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    for (let i = 0; i < 10000; i++) {
      const id = i;
      const x = getRandomInt(0, 1000);
      const y = getRandomInt(0, 1000);
      const box = {
        id,
        x,
        y
      };
      this.boxes.push(box);
    }
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  mouseDown(event) {
    const boxComponent = <BoxComponent>event.target['BoxComponent'];

    const box = boxComponent.box;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    this.offsetX = box.x - mouseX;
    this.offsetY = box.y - mouseY;

    this.currentBoxComponent = boxComponent;
    boxComponent.selected = true;
    boxComponent.update();
  }

  mouseMove(event) {
    event.preventDefault();
    if (this.currentBoxComponent !== null) {
      this.updateBox(
        this.currentBoxComponent,
        event.clientX + this.offsetX,
        event.clientY + this.offsetY
      );
    }
  }

  mouseUp() {
    if (this.currentBoxComponent) {
      this.currentBoxComponent.selected = false;
      this.currentBoxComponent.update();
    }
    this.currentBoxComponent = null;
  }

  updateBox(boxComponent, x, y) {
    boxComponent.box.x = x;
    boxComponent.box.y = y;
    boxComponent.update();
  }
}
