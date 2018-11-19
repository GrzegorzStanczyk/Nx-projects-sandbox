import { Component, OnInit, ViewChild, ElementRef, Inject, LOCALE_ID, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'nx-projects-sandbox-timer2',
  templateUrl: './timer2.component.html',
  styleUrls: ['./timer2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Timer2Component implements OnInit {
  @ViewChild('time') time: ElementRef<HTMLParagraphElement>;
  public timer$ = timer(0, 1000).pipe(map(() => new Date()));

  constructor(
    private zone: NgZone,
    @Inject(LOCALE_ID) private locate: string) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      this.timer$.subscribe(date => {
        this.time.nativeElement.textContent = formatDate(date, 'HH:mm:ss', this.locate);
      })
    })
  }
}
