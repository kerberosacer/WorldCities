import { Component, OnInit } from '@angular/core';
//import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn, AsyncValidator} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//import { environment } from './../../environments/environment';
import { City } from './city';
import { Country } from './../countries/country';

import { BaseFormComponent } from '../base-form.component';
import { CityService } from './city.service';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrl: './city-edit.component.scss'
})
export class CityEditComponent
  extends BaseFormComponent implements OnInit {
  title?: string;

  city?: City;

  id?: number;

  countries?: Country[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cityService: CityService) {
    super();
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      lat: new FormControl('', [Validators.required,
      Validators.pattern(/^[-]?[0-9]+(\.[0-9]{1,4})?$/)]),
      lon: new FormControl('', [Validators.required,
      Validators.pattern(/^[-]?[0-9]+(\.[0-9]{1,4})?$/)]),
      countryId: new FormControl('', Validators.required)
    }, null, this.isDupeCity());
    this.loadData();
  }

  loadData() {
    this.loadCountries();
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    if (this.id) {
      this.cityService.get(this.id).subscribe({
        next: (result) => {
          this.city = result;
          this.title = "Edit - " + this.city.name;

          this.form.patchValue(this.city);
        },
        error: (error) => console.error(error)
      });
    }
    else {
      //add new mode

      this.title = "Create a new City";
    }
    
  }

  onSubmit() {
    var city = (this.city) ? this.city : <City>{};
    if (city) {
      city.name = this.form.controls['name'].value;
      city.lat = +this.form.controls['lat'].value;
      city.lon = +this.form.controls['lon'].value;
      city.countryId = +this.form.controls['countryId'].value;

      if (this.id) {
        //edit mode

        this.cityService.put(city)
          .subscribe({
            next: (result) => {
              console.log("City " + city!.id + "has been updated.");

              this.router.navigate(['/cities']);
            },
            error: (error) => console.error(error)
          });
      }
      else {
        //new mode
        
        this.cityService
          .post(city)
          .subscribe({
            next: (result) => {
              console.log("City " + result.id + " has been created.");

              this.router.navigate(['/cities']);
            },
            error: (error) => console.error(error)
          });
      }
    }
  }
  loadCountries() {
    this.cityService.getCountries(0, 9999, "name",
    "asc", null, null).subscribe({
      next: (result) => {
        this.countries = result.data;
      },
      error: (error) => console.error(error)
    });
  }

  isDupeCity(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } |
      null> => {
      var city = <City>{};

      city.id = (this.id) ? this.id : 0;
      city.name = this.form.controls['name'].value;
      city.lon = this.form.controls['lon'].value;
      city.lat = this.form.controls['lat'].value;
      city.countryId = +this.form.controls['countryId'].value;

      return this.cityService.isDupeCity(city)
        .pipe(map(
          result => {
            return (result ? { isDupeCity: true } : null);
          }
        ));
    }
    
  }
}
