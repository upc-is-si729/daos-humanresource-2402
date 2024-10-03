import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';
import {EmployeeWidgetComponent} from "../../components/employee-widget/employee-widget.component";
import {AnalyticWidgetComponent} from "../../components/analytic-widget/analytic-widget.component";

@Component({
  selector: 'app-dashboard-management',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule, EmployeeWidgetComponent, AnalyticWidgetComponent],
  templateUrl: './dashboard-management.component.html',
  styleUrl: './dashboard-management.component.css'
})
export class DashboardManagementComponent {

}
