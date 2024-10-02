import {Component, EventEmitter, inject, Inject, OnInit, ViewChild} from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";
import {MatOption, MatSelect} from "@angular/material/select";
import {Location} from "../../model/location.entity";
import {Country} from "../../model/country.entity";
import {LocationService} from "../../services/location.service";

@Component({
  selector: 'app-location-create-and-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatDialogContent,
    MatInputModule, MatFormField, FormsModule, TranslateModule, MatDialogActions, MatDialogClose, MatSelect, MatOption
  ],
  templateUrl: './location-create-and-edit.component.html',
  styleUrl: './location-create-and-edit.component.css'
})
export class LocationCreateAndEditComponent implements OnInit {
  // Attributes
  location: Location;
  countries!: Array<Country>;
  editMode!: boolean;
  inputData: any;
  @ViewChild('resourceForm', {static: false}) resourceForm!: NgForm;

  private locationService: LocationService = inject(LocationService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<LocationCreateAndEditComponent>) {
    this.location = data.location;
    this.countries = data.countries;
    this.editMode = data.editMode;
  }

  // CRUD Actions
  private createResource(): void {
    this.locationService.create(this.location)
      .subscribe(response => {
        this.location = response;
      });
  };

  private updateResource(): void {
    let resourceToUpdate: Location = this.location;
    this.locationService.update(this.location.id, resourceToUpdate)
      .subscribe(response => {
        this.location = response;
      });
  };

  // UI Event Handlers
  onSubmit(): void {
    if (this.resourceForm.form.valid) {
      if (this.editMode) {
        this.updateResource();
      } else {
        this.createResource();
      }
      this.onClose();
    } else {
      console.error('Invalid data in form');
    }
  }
  onCancel(): void {
    console.log('Submit');
  }
  onClose(): void {
    this.dialogRef.close()
  }
  ngOnInit(): void {
    this.inputData = this.data;
  }

}
