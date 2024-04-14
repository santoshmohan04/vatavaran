import { createReducer, on } from '@ngrx/store';
import { ICityWeather, IDailyWeatherData } from './weather.model';
import {
  clearAllCities,
  deleteCity,
  loadCityWeatherData,
  loadCityWeatherDataFailure,
  loadCityWeatherDataSuccess,
  loadDailyWeatherData,
  loadDailyWeatherDataFailure,
  loadDailyWeatherDataSuccess,
} from './weather.action';

export interface IWeatherState {
  data: ICityWeather | null;
  dailyData: IDailyWeatherData | null;
  cities: string[];
  loading: boolean;
  error: string;
}

export const initialState: IWeatherState = {
  data: null,
  dailyData: null,
  cities: [],
  loading: false,
  error: '',
};

export const weatherReducer = createReducer(
  initialState,
  on(loadCityWeatherData, (state) => ({ ...state, loading: true, error: '', dailyData: null })),
  on(loadCityWeatherDataSuccess, (state, { data, cityName }) => {
    let citiesList = [
      cityName,
      ...state.cities.filter((city) => city.toLowerCase() !== cityName.toLowerCase()),
    ];
    if (citiesList.length > 8) citiesList = citiesList.slice(0, 8);
    return {
      ...state,
      cities: citiesList,
      data,
      loading: false,
      dailyData: null,
    };
  }),
  on(loadCityWeatherDataFailure, (state, { error }) => ({
    ...state,
    data: null,
    loading: false,
    error,
    dailyData: null,
  })),
  on(loadDailyWeatherData, (state) => ({ ...state, loading: true, error: '', dailyData: null })),
  on(loadDailyWeatherDataSuccess, (state, { dailyData }) => ({
    ...state,
    loading: false,
    dailyData,
  })),
  on(loadDailyWeatherDataFailure, (state, { error }) => ({
    ...state,
    data: null,
    loading: false,
    error,
    dailyData: null,
  })),
  on(deleteCity, (state, { cityName }) => ({
    ...state,
    cities: state.cities.filter((city) => city != cityName),
  })),
  on(clearAllCities, (state) => ({ ...state, cities: [] }))
);
