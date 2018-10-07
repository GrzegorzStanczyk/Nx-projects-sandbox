import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopPropagation]'
})
export class StopPropagationDirective {

  @HostListener('mousedown', ['$event'])
  @HostListener('mousemove', ['$event'])
  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  @HostListener('touchdown', ['$event'])
  @HostListener('touchmove', ['$event'])
  @HostListener('touchleave', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  stopPropagation(event: MouseEvent | TouchEvent): void {
    event.stopPropagation();
    event.preventDefault();
  }

}
