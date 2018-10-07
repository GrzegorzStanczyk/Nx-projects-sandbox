import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[apDraggable]'
})
export class DraggableDirective {
  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;

  @Output() dragStart = new EventEmitter<MouseEvent | TouchEvent>();
  @Output() dragMove = new EventEmitter<MouseEvent | TouchEvent>();
  @Output() dragEnd = new EventEmitter<MouseEvent | TouchEvent>();

  @HostListener('mousedown', ['$event'])
  @HostListener('touchdown', ['$event'])
  onPointerDown(event: MouseEvent | TouchEvent): void {
    this.dragging = true;
    this.dragStart.emit(event);
  }

  @HostListener('mousemove', ['$event'])
  @HostListener('touchmove', ['$event'])
  onPointerMove(event: MouseEvent | TouchEvent): void {
    if (!this.dragging) {
      return;
    }

    this.dragMove.emit(event);
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  @HostListener('touchleave', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  onPointerUp(event: MouseEvent | TouchEvent): void {
    if (!this.dragging) {
      return;
    }

    this.dragging = false;
    this.dragEnd.emit(event);
  }
}
