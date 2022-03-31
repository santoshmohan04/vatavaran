import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherApiService } from './weatherapi.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
   cityList:string[] = ["Hyderabad", "Delhi", "London"];
   cityLocations:any = [];
   cityWeather:any = {};
   weather:any = [];
   city:string = "";
   current:any = {};
   dailyWeather:any = [];
   error:string = "";

   constructor(private getLocation: WeatherApiService) { }


    addCityForm = new FormGroup({
      'city': new FormControl(null, Validators.required)
    });

    ngOnInit(): void {
      this.cityList.forEach(element => {
        this.getLocation.getGeoLoc(element)
        .subscribe(responseData => {
            this.cityLocations.push(responseData);
        });
      });
    }  
    

    onAdd() {
      this.getLocation.getGeoLoc(this.addCityForm.value.city)
      .subscribe({
        next:  responseData => {
        console.log(responseData);
          if (this.cityList.length == 8) {
            this.cityList.splice(7,1);
            this.cityList.splice(0,0,this.addCityForm.value.city);
            this.cityLocations = [];
            this.ngOnInit();
          } else {
            this.cityList.splice(0,0,this.addCityForm.value.city);
            this.cityLocations = [];
            this.ngOnInit();
          }
        },
        error: error => {
          this.error = error.message;
          console.error('There was an error!', error);
        }
      });
      console.log(this.cityList);
    }

    refreshWeather(i:number){
      this.cityWeather = this.cityLocations[i];
    }

    removeCity(i:number) {
      console.log(i);
      this.cityLocations.splice(i, 1);
    }

    clearList() {
      this.cityLocations.splice(0,this.cityLocations.length);
      this.cityList.splice(0,this.cityList.length);
    }

    refreshStatus() {
      this.cityWeather = false;
      this.cityWeather = true;
    }

    getWeatherUpdates(i:number) {
        let latitude = this.cityLocations[i].coord.lat;
        let longitude = this.cityLocations[i].coord.lon;
        this.city = this.cityLocations[i].name;
        this.getLocation.getCityWeather(latitude, longitude) 
        .subscribe(responseData => {
          this.cityWeather = responseData;
          this.weather = Object.values(this.cityWeather.current.weather)
          this.current = this.cityWeather.current
          this.dailyWeather = this.cityWeather.daily
        });
    }
}
