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
  scale = 0.5;

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
    const move$ = fromEvent(this.svg.nativeElement ,'mousemove').pipe(map(this.mapEvent));
    const mousedown$ = fromEvent(this.svg.nativeElement ,'mousedown').pipe(map(this.mapEvent));
    const mouseup$ = fromEvent(this.svg.nativeElement ,'mouseup').pipe(map(this.mapEvent));
    const mouseleave$ = fromEvent(this.svg.nativeElement ,'mouseleave').pipe(map(this.mapEvent));

    const action$ = mousedown$.pipe(
      switchMap((down: any) => {
        return move$.pipe(
          takeUntil(merge(mouseup$, mouseleave$)),
          map((move: any) => ({down, move})))
      })
    )

    mousedown$.pipe(takeUntil(this.destroy$)).subscribe(() => this.translateCoordsTemp = this.translateCoords)
    mousedown$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      console.log('data: ', data);
      console.log('getMousePosition: ', this.getMousePosition(data));
      console.log('getPlanPosition: ', this.getPlanPosition(data));
    })

    action$.pipe(takeUntil(this.destroy$)).subscribe(({down, move}) => {

      const downPoint = this.getPlanPosition(down);
      const movePoint = this.getPlanPosition(move);
      const svgPoint = this.getMousePosition(move);

      this.translateCoords = {
        x: this.scale * movePoint.x - (this.scale * downPoint.x - (svgPoint.x - this.scale * downPoint.x)),
        y: this.scale * movePoint.y - (this.scale * downPoint.y - this.translateCoordsTemp.y)
        // x: movePoint.x - (downPoint.x - this.translateCoordsTemp.x),
        // y: movePoint.y - (downPoint.y - this.translateCoordsTemp.y)
      }
      console.log('this.scale * movePoint.x - (this.scale * downPoint.x - (svgPoint.x - this.scale * downPoint.x)),: ', this.scale * movePoint.x - (this.scale * downPoint.x - (svgPoint.x - this.scale * downPoint.x)),);
      console.log('movePoint.x - (downPoint.x - this.translateCoordsTemp.x): ', movePoint.x - (downPoint.x - this.translateCoordsTemp.x));
      // this.translate = `translate(${this.translateCoords.x},${this.translateCoords.y})`
    });
  }

  getMousePosition(data) {
    let pt = this.svg.nativeElement.createSVGPoint();
    pt.x = data.x;
    pt.y = data.y;
    return pt.matrixTransform(this.svg.nativeElement.getScreenCTM().inverse())
  }

  getPlanPosition(data) {
    let pt = this.svg.nativeElement.createSVGPoint();
    pt.x = data.x;
    pt.y = data.y;
    return pt.matrixTransform(this.plan.nativeElement.getScreenCTM().inverse())
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
