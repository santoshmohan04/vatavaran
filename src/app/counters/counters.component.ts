import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  addCounter,
  decrementCounter,
  deleteCounter,
  incrementCounter,
  resetCounters,
} from '../stores/counters-store/counters.actions';
import { IAppState } from '../stores/reducers';

@Component({
  selector: 'app-counters',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './counters.component.html',
  styleUrl: './counters.component.css',
})
export class CountersComponent implements OnInit {
  counters$?: Observable<number[]>;
  constructor(private _store: Store<IAppState>) {}

  ngOnInit(): void {
    this.counters$ = this._store.select('counters');
  }

  incrementCounter(index: number) {
    this._store.dispatch(incrementCounter({ index }));
  }

  decrementCounter(index: number) {
    this._store.dispatch(decrementCounter({ index }));
  }

  resetCounters() {
    this._store.dispatch(resetCounters());
  }

  addCounter() {
    this._store.dispatch(addCounter());
  }

  deleteCounter(index: number) {
    this._store.dispatch(deleteCounter({ index }));
  }
}
