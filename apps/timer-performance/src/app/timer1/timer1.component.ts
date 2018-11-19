import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nx-projects-sandbox-timer1',
  templateUrl: './timer1.component.html',
  styleUrls: ['./timer1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Timer1Component {
  @Input() time: string;
}
