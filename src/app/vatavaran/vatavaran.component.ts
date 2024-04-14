import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  clearAllCities,
  deleteCity,
  loadCityWeatherData,
  loadDailyWeatherData,
} from '../stores/weather-store/weather.action';
import {
  ICityWeather,
  IDailyWeatherData,
} from '../stores/weather-store/weather.model';
import {
  getCityList,
  getDailyWeatherData,
  getWeather,
  getWeatherError,
  getWeatherLoader,
} from '../stores/weather-store/weather.selectors';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-vatavaran',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  templateUrl: './vatavaran.component.html',
  styleUrl: './vatavaran.component.css',
})
export class VatavaranComponent implements OnInit, OnDestroy {
  constructor(private _store: Store) {}
  cityNameControl: FormControl = new FormControl('', Validators.required);

  weather$: Observable<ICityWeather | null> = this._store
    .select(getWeather)
    .pipe(
      tap((data) => {
        if (data) {
          this.cityNameControl.reset();
          this._store.dispatch(loadDailyWeatherData(data.coord));
        }
      })
    );
  weatherLoader$: Observable<boolean> = this._store.select(getWeatherLoader);
  weatherError$: Observable<string> = this._store.select(getWeatherError);
  cities$: Observable<string[]> = this._store.select(getCityList);
  dailyData$: Observable<IDailyWeatherData | null> =
    this._store.select(getDailyWeatherData);
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.weatherError$.subscribe((error) => {
        if (error) {
          console.error('Weather Data Error Response', error);
          alert(error);
        }
      })
    );
  }

  onSearch(value?: string) {
    if (value || this.cityNameControl.value)
      this._store.dispatch(
        loadCityWeatherData({ cityName: value || this.cityNameControl.value })
      );
  }

  inCelcius(value: number) {
    let fahrenheit = 285;
    let celsius = (fahrenheit - 32) * (5 / 9);
    return celsius;
  }

  deleteCity(cityName: string) {
    this._store.dispatch(deleteCity({ cityName }));
  }

  clearAllCities() {
    this._store.dispatch(clearAllCities());
  }

  getIcon(description: string) {
    return description.toLowerCase()?.includes('clear')
      ? '/assets/icons/day.svg'
      : description.toLowerCase()?.includes('rain')
      ? '/assets/icons/rainy-1.svg'
      : description.toLowerCase()?.includes('cloud')
      ? '/assets/icons/cloudy-day-1.svg'
      : description.toLowerCase()?.includes('haze')
      ? '/assets/icons/haze.png'
      : '/assets/icons/snowy-1.svg';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
