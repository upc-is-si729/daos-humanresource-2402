import { Injectable } from '@angular/core';

import { BaseService } from "../../shared/services/base.service";
import { Region } from "../model/region.entity";

@Injectable({
  providedIn: 'root'
})
export class RegionsService extends BaseService<Region> {

  constructor() {
    super();
    this.resourceEndpoint = '/regions';
  }
}
