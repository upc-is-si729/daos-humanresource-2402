import { Routes } from '@angular/router';
import {LocationManagementComponent} from "./pages/location-management/location-management.component";
import {UbigeoBcComponent} from "./pages/ubigeo-bc/ubigeo-bc.component";
import {CountryManagementComponent} from "./pages/country-management/country-management.component";

export const ubigeoRoutes: Routes = [
  {
    path: '',
    component: UbigeoBcComponent,
    children: [
      {
        path: 'countries',
        component: CountryManagementComponent
      },
      {
        path: 'locations',
        component: LocationManagementComponent
      }
    ]
  }
];
