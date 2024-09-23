import { Routes } from '@angular/router';

import { HomeComponent } from "./public/pages/home/home.component";
import { AboutComponent } from "./public/pages/about/about.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { CountryManagementComponent } from "./country/pages/country-management/country-management.component";
import { LocationManagementComponent } from "./ubigeo/pages/location-management/location-management.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'country/countries', component: CountryManagementComponent },
  { path: 'ubigeo/locations', component: LocationManagementComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
