import {Component, inject} from '@angular/core';

import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { CountriesService } from "../../services/countries.service";
import { RegionsService } from "../../services/regions.service";
import { Country } from "../../model/country.entity";
import { Region } from "../../model/region.entity";
import { CountryCreateAndEditComponent } from "../../components/country-create-and-edit/country-create-and-edit.component";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-country-management',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, CountryCreateAndEditComponent, MatTableModule, NgClass, TranslateModule],
  templateUrl: './country-management.component.html',
  styleUrl: './country-management.component.css'
})
export class CountryManagementComponent implements OnInit, AfterViewInit  {

  // Attributes
  countryData: Country;
  regionsData!: Array<Region>;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  private countriesService: CountriesService = inject(CountriesService);
  private regionsService: RegionsService = inject(RegionsService);

  // Constructor
  constructor() {
    this.isEditMode = false;
    this.countryData = {} as Country;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.countryData = {} as Country;
  }

  // CRUD Actions
  private getAllSubResources(): void {
    this.regionsService.getAll()
      .subscribe((response: any) => {
        this.regionsData = response;
      });
  };

  private getAllResources(): void {
    this.countriesService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  };

  private createResource(): void {
    this.countriesService.create(this.countryData)
      .subscribe((response: any) => {
        this.dataSource.data.push({...response});
        // Actualiza el dataSource.data con los resources actuales, para que Angular detecte el cambio y actualice la vista.
        this.dataSource.data = this.dataSource.data
          .map((country: Country) => {
            return country;
          });
      });
  };

  private updateResource(): void {
    let resourceToUpdate: Country = this.countryData;
    this.countriesService.update(this.countryData.id, resourceToUpdate)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((country: Country) => {
            if (country.id === response.id) {
              return response;
            }
            return country;
          });
      });
  };

  private deleteResource(id: string): void {
    this.countriesService.delete(id)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter((country: Country) => {
            return country.id !== id ? country : false;
          });
      });
  };

  // UI Event Handlers
  onEditItem(element: Country) {
    this.isEditMode = true;
    this.countryData = element;
  }

  onDeleteItem(element: Country) {
    this.deleteResource(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllResources();
  }

  onResourceAdded(element: Country) {
    this.countryData = element;
    this.createResource();
    this.resetEditState();
  }

  onResourceUpdated(element: Country) {
    this.countryData = element;
    this.updateResource();
    this.resetEditState();
  }

  // Lifecycle Hooks
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllResources();
    this.getAllSubResources()
  }

}
