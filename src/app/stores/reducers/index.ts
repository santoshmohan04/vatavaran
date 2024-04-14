import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { countersReducer } from '../counters-store/counters.reducer';
import { IWeatherState, weatherReducer } from '../weather-store/weather.reducer';
import { WeatherEffects } from '../weather-store/weather-effects';

export interface IAppState {
  counters: number[];
  weather: IWeatherState;
}

export const reducers: ActionReducerMap<IAppState> = {
  counters: countersReducer,
  weather: weatherReducer,
};

export const appEffects = [WeatherEffects];

export const metaReducers: MetaReducer<IAppState>[] = isDevMode() ? [] : [];
