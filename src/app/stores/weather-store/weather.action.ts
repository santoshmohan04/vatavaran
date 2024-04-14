import { createAction, props } from '@ngrx/store';
import { ICityWeather, IDailyWeatherData } from './weather.model';

export const loadCityWeatherData = createAction('[Weather Page] Load Data', props<{ cityName: string }>());

export const loadCityWeatherDataSuccess = createAction(
  '[Weather API] Load Data Success',
  props<{ data: ICityWeather; cityName: string }>()
);

export const loadCityWeatherDataFailure = createAction(
  '[Weather API] Load Data Failure',
  props<{ error: string }>()
);

export const loadDailyWeatherData = createAction(
  '[Weather Page] Load Daily Data',
  props<{ lat: number; lon: number }>()
);

export const loadDailyWeatherDataSuccess = createAction(
  '[Weather API] Load Daily Data Success',
  props<{ dailyData: IDailyWeatherData }>()
);

export const loadDailyWeatherDataFailure = createAction(
  '[Weather API] Load Daily Data Failure',
  props<{ error: string }>()
);

export const deleteCity = createAction('[Weather Page] Delete City', props<{ cityName: string }>());

export const clearAllCities = createAction('[Weather Page] Clear All Cities');
