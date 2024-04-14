import { createAction, props } from '@ngrx/store';

export const incrementCounter = createAction('[Counters Page] Increment', props<{ index: number }>());
export const decrementCounter = createAction('[Counters Page] Decrement', props<{ index: number }>());
export const resetCounters = createAction('[Counters Page] Reset');
export const addCounter = createAction('[Counters Page] Add');
export const deleteCounter = createAction('[Counters Page] Delete', props<{ index: number }>());
