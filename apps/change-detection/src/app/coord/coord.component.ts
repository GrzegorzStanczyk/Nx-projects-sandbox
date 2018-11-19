import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { AppComponent } from '../app.component';
import { ShapeComponent } from '../shape/shape.component';

@Component({
  selector: 'nx-projects-sandbox-coord',
  templateUrl: './coord.component.html',
  styleUrls: ['./coord.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordComponent implements OnInit, OnChanges {
  @Input() coord;
  constructor(
    private app: AppComponent,
    private shape: ShapeComponent,
    private changeDetector: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      // this.fireEvent();
    });
    this.fireEvent();
  }
  ngAfterViewInit() {
    // this.changeDetector.detach();
  }

  fireEvent() {
    fromEvent(document, 'mousemove').subscribe((data: MouseEvent) => {
      // this.app.shapes[0].coords[0] = { x: data.clientX, y: 0 };

      // let d = this.app.shapes.slice();
      // d[0].coords[0] = {x: data.clientX, y: 0};
      // this.app.shapes = d;

      // let d = [...this.app.shapes];
      //     d[0].coords[0] = {x: data.clientX, y: 0}
      //       this.app.shapes = d

      // this.coord.x = data.clientX
      // let shape = {...this.shape.shape};
      // shape.coords[0].x = data.clientX
      // this.shape.shape = {
      //   ...shape
      // }
      // this.zone.run(() => {
      this.changeDetector.markForCheck();
      // this.changeDetector.detectChanges();
      // });
      this.app.shapes[1].coords[0].y = data.clientY;
    });
  }

  ngOnChanges() {
    console.log('coord changes');
  }
  ngDoCheck() {
    console.log('coord docheck');
  }
}
