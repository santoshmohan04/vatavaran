import { createReducer, on } from '@ngrx/store';
import {
  addCounter,
  decrementCounter,
  deleteCounter,
  incrementCounter,
  resetCounters,
} from './counters.actions';

export const initialState: number[] = [];

export const countersReducer = createReducer(
  initialState,
  on(incrementCounter, (state, { index }) => {
    let newState = [...state];
    newState[index] = newState[index] + 1;
    return newState;
  }),
  on(decrementCounter, (state, { index }) => {
    let newState = [...state];
    if (newState[index] > 0) {
      newState[index] = newState[index] - 1;
    }
    return newState;
  }),
  on(resetCounters, (state) => []),
  on(addCounter, (state) => [...state, 0]),
  on(deleteCounter, (state, { index }) => {
    let newState = [...state];
    newState.splice(index, 1);
    return newState;
  })
);
