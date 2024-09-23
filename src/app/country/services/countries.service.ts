import { Injectable } from '@angular/core';

import { BaseService } from "../../shared/services/base.service";
import { Country } from "../model/country.entity";

@Injectable({
  providedIn: 'root'
})
export class CountriesService extends BaseService<Country> {

  constructor() {
    super();
    this.resourceEndpoint = '/countries';
  }
}
