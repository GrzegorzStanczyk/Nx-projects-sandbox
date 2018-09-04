import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './+state/app.reducer';
import { getListAndRouter } from 'apps/router-ngrx/src/app/+state/app.selectors';

@Component({
  selector: 'nx-projects-sandbox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'router-ngrx';

  constructor(private state: Store<State>) {
    this.state.select(getListAndRouter).subscribe(console.log)
  }
}
