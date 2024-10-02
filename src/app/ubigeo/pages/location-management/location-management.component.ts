import {Component, inject} from '@angular/core';

import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { LocationCreateAndEditComponent } from "../../components/location-create-and-edit/location-create-and-edit.component";
import { Location } from "../../model/location.entity";
import { CountriesService } from "../../services/countries.service";
import { LocationService } from "../../services/location.service";
import { Country } from "../../model/country.entity";

@Component({
  selector: 'app-location-management',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, LocationCreateAndEditComponent, MatTableModule, NgClass, TranslateModule, MatButtonModule],
  templateUrl: './location-management.component.html',
  styleUrl: './location-management.component.css'
})
export class LocationManagementComponent implements OnInit, AfterViewInit {
  // Attributes
  locationData: Location;
  countriesData!: Array<Country>;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'streetAddress', 'postalCode', 'city', 'stateProvince', 'actions'];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  private countriesService: CountriesService = inject(CountriesService);
  private locationService: LocationService = inject(LocationService);
  private matDialog: MatDialog = inject(MatDialog);

  // Constructor
  constructor() {
    this.isEditMode = false;
    this.locationData = {} as Location;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.locationData = {} as Location;
  }

  // CRUD Actions
  private getAllSubResources(): void {
    this.countriesService.getAll()
      .subscribe((response: any) => {
        this.countriesData = response;
      });
  };

  private getAllResources(): void {
    this.locationService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  };

  private createResource(): void {
    this.locationService.create(this.locationData)
      .subscribe(response => {
        this.dataSource.data.push({...response});
        // Actualiza el dataSource.data con los resources actuales, para que Angular detecte el cambio y actualice la vista.
        this.dataSource.data = this.dataSource.data
          .map(resource => resource);
      });
  };

  private updateResource(): void {
    let resourceToUpdate: Location = this.locationData;
    this.locationService.update(this.locationData.id, resourceToUpdate)
      .subscribe(response => {
        this.dataSource.data = this.dataSource.data
          .map(resource => {
            if (resource.id === response.id) {
              return response;
            }
            return resource;
          });
      });
  };

  private deleteResource(id: number): void {
    this.locationService.delete(id)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter(country => {
            return country.id !== id ? country : false;
          });
      });
  };

  // UI Event Handlers
  onEditItem(element: Location) {
    this.isEditMode = true;
    this.locationData = element;
    this.onOpenDialog()
  }
  onAddItem() {
    this.isEditMode = false;
    this.locationData = {} as Location;
    this.onOpenDialog()
  }

  onDeleteItem(element: Location) {
    this.deleteResource(element.id);
  }

  onOpenDialog() {
    let _matdialog = this.matDialog.open(LocationCreateAndEditComponent,
      { width: '500px',
        height: '400px',
        data: { location: this.locationData, countries: this.countriesData, editMode: this.isEditMode } });
    _matdialog.afterClosed().subscribe(() => {
      this.getAllResources();
    });
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
