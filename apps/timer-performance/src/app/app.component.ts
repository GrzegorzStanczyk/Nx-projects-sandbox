import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { mapTo, map } from 'rxjs/operators';

@Component({
  selector: 'nx-projects-sandbox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public list = new Array(100).fill(null);
  public timer$ = timer(0, 1000).pipe(map(() => new Date()));
}
