import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './angular-material.module';

import { CitiesComponent } from './cities/cities.component';
import { CountriesComponent } from './countries/countries.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CityEditComponent } from './cities/city-edit.component';
import { CountryEditComponent } from './countries/country-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FetchDataComponent,
    NavMenuComponent,
    CitiesComponent,
    CountriesComponent,
    CityEditComponent,
    CountryEditComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
