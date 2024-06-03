import { Component, AfterViewInit, Input } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';

@Component({
    selector: 'app-pie-chart',
    template: '<canvas id="pieChart" width="400" height="400"></canvas>',
    styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements AfterViewInit {
  @Input() totalHours: number = 0; // Input property to receive total hours from parent component
  pieChart!: Chart;

  constructor() { }

  ngAfterViewInit(): void {
    this.createPieChart();
  }

  createPieChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    
    const data = {
      labels: ['Placeholder'],
      datasets: [{
        data: [75],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      }]
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false,
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    };

    this.pieChart = new Chart(ctx, config);
  }
}
