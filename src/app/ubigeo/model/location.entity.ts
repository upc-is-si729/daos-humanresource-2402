export class Location {
  id: number;
  streetAddress: string;
  postalCode: string;
  city: string;
  stateProvince: string;
  countryId: string;
  constructor() {
    this.id = 0;
    this.streetAddress = '';
    this.postalCode = '';
    this.city = '';
    this.stateProvince = '';
    this.countryId = '';
  }
}
