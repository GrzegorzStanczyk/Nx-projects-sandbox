import { Directive, NgZone, HostBinding, HostListener, ElementRef, Input, AfterViewInit } from '@angular/core';
import { DraggableDirective } from './draggable.directive';

interface Position {
  x: number;
  y: number;
}

const getMousePosition = (root, target ,data) => {
  let pt = root.createSVGPoint();
  pt.x = data.clientX;
  pt.y = data.clientY;
  const element = target.nativeElement ? target.nativeElement : target;
  return pt.matrixTransform(element.getScreenCTM().inverse())
}

@Directive({
  selector: '[appMovable]'
})
export class MovableDirective extends DraggableDirective implements AfterViewInit {
  @HostBinding('class.movable') movable = true;
  @Input('position') lastPosition: Position;
  @Input() scale: number = 1;
  private startPosition: Position;
  private root: SVGSVGElement;
  private matrix;

  constructor(
    private zone: NgZone,
    public element: ElementRef) {
    super();
  }

  ngAfterViewInit() {
    this.root = document.querySelector('svg');
    const transforms= this.element.nativeElement.transform.baseVal;
    if (transforms.length === 0 ||
        transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
      const translate = this.root.createSVGTransform();
      this.matrix = this.root.createSVGMatrix();
      // this.matrix.a = this.scale;
      // this.matrix.d = this.scale;
      // translate.setMatrix(this.matrix)

      this.element.nativeElement.transform.baseVal.insertItemBefore(translate, 0);
    }
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent) {
    this.startPosition = {
      x: event.clientX - this.lastPosition.x,
      y: event.clientY - this.lastPosition.y
    }
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent) {
    this.zone.runOutsideAngular(() => {
      this.element.nativeElement.transform.baseVal
      .getItem(0)
      .setTranslate(
        (event.clientX - this.startPosition.x) / this.scale,
        (event.clientY - this.startPosition.y) / this.scale
      )

      // this.matrix.e = event.clientX - this.startPosition.x;
      // this.matrix.f = event.clientY - this.startPosition.y;
      // this.element.nativeElement.transform.baseVal
      // .getItem(0)
      // .setMatrix(this.matrix)
    })
  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent) {
    this.zone.run(() => {
      this.lastPosition = {
        x: event.clientX - this.startPosition.x,
        y: event.clientY - this.startPosition.y
      }
    })
  }
}
