import { Component, NgZone } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { switchMap, takeUntil, switchMapTo } from 'rxjs/operators';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component({
  selector: 'nx-projects-sandbox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentId = null;
  boxes = [];
  offsetX;
  offsetY;
  element;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    for (let i=0; i < 10000; i++) {
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

    const mousemove$ = fromEvent(window, 'mousemove')
    const mousedown$ = fromEvent(window, 'mousedown')
    const mouseup$ = fromEvent(window, 'mouseup')

    this.zone.runOutsideAngular(() => {
      mousedown$.subscribe((event: any) => {
        const id = Number(event.target.getAttribute("dataId"));
        const box = this.boxes[id];
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        this.offsetX = box.x - mouseX;
        this.offsetY = box.y - mouseY;
        this.zone.run(() => this.currentId = id)

        this.element = event.target;
      })

      // mousedown$.pipe(switchMapTo(mousemove$)).subscribe((event: any) => {
      //   event.preventDefault();
      //   this.element.setAttribute("x", event.clientX + this.offsetX + "px");
      //   this.element.setAttribute("y", event.clientY + this.offsetY + "px");
      // })

      mousedown$.pipe(
        switchMap(() =>
        mousemove$.pipe(takeUntil(mouseup$))
      )).subscribe((event: MouseEvent) => {
        event.preventDefault();
        this.element.setAttribute("x", event.clientX + this.offsetX + "px");
        this.element.setAttribute("y", event.clientY + this.offsetY + "px");
      })

      mouseup$.subscribe((event: MouseEvent) => {
        // this.zone.run(() => {
          this.updateBox(this.currentId, event.clientX + this.offsetX, event.clientY + this.offsetY)
          // this.currentId  = null;
        // })
      })
      // mousemove$.pipe(switchMapTo(mouseup$)).subscribe((event: MouseEvent) => {
      //   this.zone.run(() => {
      //     this.updateBox(this.currentId, event.clientX + this.offsetX, event.clientY + this.offsetY)
      //     this.currentId  = null;
      //   })
      // })
      // mousedown$.pipe(switchMapTo(mousemove$.pipe(switchMapTo(mouseup$)))).subscribe((event: MouseEvent) => {
      //   this.zone.run(() => {
      //     this.updateBox(this.currentId, event.clientX + this.offsetX, event.clientY + this.offsetY)
      //     this.currentId  = null;
      //   })
      // })

    });
  }

  bindMouse = (ev) => {
    this.mouseMove(ev);
  }

  mouseDown(event) {
    // const id = Number(event.target.getAttribute("dataId"));
    // const box = this.boxes[id];
    // const mouseX = event.clientX;
    // const mouseY = event.clientY;
    // this.offsetX = box.x - mouseX;
    // this.offsetY = box.y - mouseY;
    // this.currentId = id;

    // this.element = event.target;
    // this.zone.runOutsideAngular(() => {
    //   window.document.addEventListener("mousemove", this.bindMouse);
    // });
  }

  mouseMove(event) {
    // event.preventDefault();
    // this.element.setAttribute("x", event.clientX + this.offsetX + "px");
    // this.element.setAttribute("y", event.clientY + this.offsetY + "px");

    // Another options is to change styles using transformations
    //this.element.style = `transform: translate3d(${event.clientX - this.off.mouseX}px,
      //${event.clientY - this.off.mouseY}px, 0)`;
  }

  mouseUp($event) {
    // this.zone.run(() => {
    //   this.updateBox(this.currentId, $event.clientX + this.offsetX, $event.clientY + this.offsetY)
    //   this.currentId  = null;
    // })
    // window.document.removeEventListener("mousemove", this.bindMouse);
  }

  updateBox(id, x, y) {
    const box = this.boxes[id];
    box.x = x;
    box.y = y;
  }
}
