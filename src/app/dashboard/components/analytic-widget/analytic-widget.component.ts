import {Component, ElementRef, OnInit, viewChild} from '@angular/core';
import { Chart } from "chart.js/auto";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-analytic-widget',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './analytic-widget.component.html',
  styleUrl: './analytic-widget.component.css'
})
export class AnalyticWidgetComponent implements OnInit {
  chart = viewChild.required<ElementRef>('chart');

  ngOnInit() {
    new Chart(this.chart().nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Views',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: 'start',
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4
          }
        }
      }
    });
  }
}
