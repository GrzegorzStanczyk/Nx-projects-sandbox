import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { map, switchMap, takeUntil, concatMap } from 'rxjs/operators'

@Component({
  selector: 'nx-projects-sandbox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  title = 'svg';
  @ViewChild('svg') svg: ElementRef;
  @ViewChild('plan') plan: ElementRef;
  translate: string = '';

  destroy$ = new Subject();

  translateCoords = {
    x: 0,
    y: 0
  }

  translateCoordsTemp = {
    x: 0,
    y: 0
  }

  ngAfterViewInit(): void {
    this.createEvents()
  }
  createEvents() {
    const move$ = fromEvent(this.plan.nativeElement ,'mousemove').pipe(map(this.mapEvent));
    const mousedown$ = fromEvent(this.plan.nativeElement ,'mousedown').pipe(map(this.mapEvent));
    const mouseup$ = fromEvent(this.plan.nativeElement ,'mouseup').pipe(map(this.mapEvent));
    const mouseleave$ = fromEvent(this.plan.nativeElement ,'mouseleave').pipe(map(this.mapEvent));

    const action$ = mousedown$.pipe(
      switchMap((down: any) => {
        return move$.pipe(
          takeUntil(merge(mouseup$, mouseleave$)),
          map((move: any) => ({down, move})))
      })
    )

    mousedown$.pipe(takeUntil(this.destroy$)).subscribe(() => this.translateCoordsTemp = this.translateCoords)

    action$.pipe(takeUntil(this.destroy$)).subscribe(({down, move}) => {

      const downPoint = this.getMousePosition(down);
      const movePoint = this.getMousePosition(move);

      this.translateCoords = {
        x: movePoint.x - (downPoint.x - this.translateCoordsTemp.x),
        y: movePoint.y - (downPoint.y - this.translateCoordsTemp.y)
      }
      this.translate = `translate(${this.translateCoords.x},${this.translateCoords.y})`
    });
  }

  getMousePosition(data) {
    let pt = this.svg.nativeElement.createSVGPoint();
    pt.x = data.x;
    pt.y = data.y;
    return pt.matrixTransform(this.svg.nativeElement.getScreenCTM().inverse())
  }

  mapEvent(e: MouseEvent) {
    e.preventDefault();
    return {
      target: e.target,
      type: e.type,
      x: e.clientX,
      y: e.clientY
    }
  }

}
