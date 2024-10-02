import { Component } from '@angular/core';

import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Country } from "../../model/country.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Region } from "../../model/region.entity";

@Component({
  selector: 'app-country-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, MatSelectModule, MatIconModule],
  templateUrl: './country-create-and-edit.component.html',
  styleUrl: './country-create-and-edit.component.css'
})
export class CountryCreateAndEditComponent {
  // Attributes
  @Input() country: Country;
  @Input() regions!: Array<Region>;
  @Input() editMode: boolean = false;
  @Output() resourceAdded: EventEmitter<Country> = new EventEmitter<Country>();
  @Output() resourceUpdated: EventEmitter<Country> = new EventEmitter<Country>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('resourceForm', {static: false}) resourceForm!: NgForm;

  // Methods
  constructor() {
    this.country = {} as Country;
  }

  // Private methods
  private resetEditState(): void {
    this.country = {} as Country;
    this.editMode = false;
    this.resourceForm.reset();
    this.resourceForm.resetForm();
  }

  // Event Handlers

  onSubmit(): void {
    if (this.resourceForm.form.valid) {
      let emitter: EventEmitter<Country> = this.editMode ? this.resourceUpdated : this.resourceAdded;
      emitter.emit(this.country);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel(): void {
    this.editCanceled.emit();
    this.resetEditState();
  }
}
