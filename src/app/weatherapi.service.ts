import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable()
export class WeatherApiService {
  constructor(private http: HttpClient) {}

  getGeoLoc(cityList: string): Observable<[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('q', cityList);
    queryParams = queryParams.append('units', 'metric');
    queryParams = queryParams.append('appid', environment.API);

    return this.http
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: queryParams,
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          throw new Error(error.error.message);
        })
      );
  }

  getCityWeather(latitude: number, longitude: number): Observable<[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('lat', latitude);
    queryParams = queryParams.append('lon', longitude);
    queryParams = queryParams.append('exclude', 'minutely,hourly');
    queryParams = queryParams.append('appid', environment.API);
    queryParams = queryParams.append('units', 'metric');

    return this.http
      .get('https://api.openweathermap.org/data/2.5/onecall', {
        params: queryParams,
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((error) => {
          throw new Error(error.error.message);
        })
      );
  }
}
