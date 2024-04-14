import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IWeatherState } from './weather.reducer';

export const getWeatherState = createFeatureSelector<IWeatherState>('weather');

export const getWeather = createSelector(getWeatherState, (state: IWeatherState) => state.data);

export const getDailyWeatherData = createSelector(getWeatherState, (state: IWeatherState) => state.dailyData);

export const getCityList = createSelector(getWeatherState, (state: IWeatherState) => state.cities);

export const getWeatherLoader = createSelector(getWeatherState, (state: IWeatherState) => state.loading);

export const getWeatherError = createSelector(getWeatherState, (state: IWeatherState) => state.error);
