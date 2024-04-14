import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountersService {
  counters: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  updateCounter(index: number, task: 'INCREMENT' | 'DECREMENT') {
    const existingValues = [...this.counters.getValue()];
    existingValues[index] = task === 'INCREMENT' ? existingValues[index] + 1 : existingValues[index] - 1;
    this.counters.next(existingValues);
  }

  addCounter() {
    this.counters.next([...this.counters.getValue(), 0]);
  }

  deleteCounter(index: number) {
    const existingValue = [...this.counters.getValue()];
    existingValue.splice(index, 1);
    this.counters.next(existingValue);
  }

  resetCounters() {
    this.counters.next([]);
  }
}
