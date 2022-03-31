import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from "../environments/environment";

@Injectable()
export class WeatherApiService {
    
  constructor(private http: HttpClient) { }

  getGeoLoc(cityList:string): Observable<[]> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("q", cityList);
    queryParams = queryParams.append("units", "metric")
    queryParams = queryParams.append("appid", environment.API);

    return Observable.create((observer: Subscriber<{}>): void => { 
        this.http
        .get(
            'https://api.openweathermap.org/data/2.5/weather', {params:queryParams}
        )
        .subscribe((responseData) => {
            observer.next(responseData);
        });
    });
 }
 
 getCityWeather(latitude:number, longitude:number): Observable<[]> {

  let queryParams = new HttpParams();
  queryParams = queryParams.append("lat", latitude);
  queryParams = queryParams.append("lon", longitude);
  queryParams = queryParams.append("exclude", 'minutely,hourly');
  queryParams = queryParams.append("appid", environment.API);
  queryParams = queryParams.append("units", 'metric');

  return Observable.create((observer: Subscriber<{}>): void => { 
      this.http
      .get(
          'https://api.openweathermap.org/data/2.5/onecall', {params:queryParams} 
      )
      .subscribe((responseData) => {
  
        observer.next(responseData);
      });
  });
}

}  