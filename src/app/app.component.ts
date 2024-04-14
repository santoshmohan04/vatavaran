import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { WeatherApiService } from './weatherapi.service';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  cityList: string[] = ['Hyderabad', 'Delhi', 'London'];
  searchCity: any;
  selectedCity: number;
  cityLocations: any = [];
  cityWeather: any;
  weather: any = [];
  city: string = '';
  current: any = {};
  dailyWeather: any = [];
  errorMsg: string = '';
  addCityForm: UntypedFormGroup;
  private listSub = new BehaviorSubject([]);
  listSubObservab = this.listSub.asObservable();

  constructor(
    private getLocation: WeatherApiService,
    public title: Title,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Vatavaran');
    this.cityList.forEach((element) => {
      this.getLocation.getGeoLoc(element).subscribe((responseData) => {
        this.cityLocations.push(responseData);
      });
      this.listSub.next(this.cityLocations)
    });

    this.addCityForm = this.fb.group({
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    });

  }

  ngAfterViewInit() {
    console.log(this.cityLocations);
    this.listSubObservab.subscribe((res:any) => {
      setTimeout(() => {
        this.refreshWeather(0);
      this.getWeatherUpdates(0);
    }, 2000);

    })
  }

  onAdd(form: UntypedFormGroup) {
    let enteredCity = form.value.city;
    this.getLocation.getGeoLoc(enteredCity).subscribe({
      next: (res: any) => {
        this.cityLocations.push(res);
        let noCityLoc = this.cityLocations.length;
        let loadCity = noCityLoc -1
        this.refreshWeather(loadCity);
      this.getWeatherUpdates(loadCity);
        form.reset();
      },
      error: (err: any) => {
        let dispErr = err.toString().replace(/Error: /g, '');
        // console.log('There was an error!', dispErr);
        this.errorMsg = dispErr;
      },
    });
  }

  refreshWeather(i: number) {
    this.selectedCity = i
    this.cityWeather = this.cityLocations[i];
  }

  removeCity(i: number) {
    console.log(i);
    this.cityLocations.splice(i, 1);
  }

  clearList() {
    this.cityLocations = [];
    this.city = ''
    this.cityWeather = {};
    this.weather = [];
    this.current = {};
    this.dailyWeather = [];
  }

  refreshStatus() {
    this.cityWeather = false;
    this.cityWeather = true;
  }

  getWeatherUpdates(i: number) {
    console.log(i);
    let latitude = this.cityLocations[i].coord.lat;
    let longitude = this.cityLocations[i].coord.lon;
    this.city = this.cityLocations[i].name;
    this.getLocation.getCityWeather(latitude, longitude).subscribe({
      next: (res: any) => {
        this.cityWeather = res;
        this.weather = Object.values(this.cityWeather.current.weather);
        this.current = this.cityWeather.current;
        this.dailyWeather = this.cityWeather.daily;
      },
      error: (err: any) => {
        let dispErr = err.toString().replace(/Error: /g, '');
        // console.log('There was an error!', dispErr);
        this.errorMsg = dispErr;
      },
    });
  }
}
