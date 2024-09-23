import { Injectable } from '@angular/core';

import { BaseService } from "../../shared/services/base.service";
import { Location } from "../model/location.entity";

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService<Location> {

  constructor() {
    super();
    this.resourceEndpoint = '/locations';
  }
}
