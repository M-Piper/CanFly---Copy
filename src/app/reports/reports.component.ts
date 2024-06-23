import { Component, OnInit } from '@angular/core';
import { LogsService } from '../logs.service';
import { Report } from '../models/report'; // Adjust this import based on your actual model

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportData: Report[] = [];
  ratingReports: Report[] = [];
  medicalReports: Report[] = [];
  otherReports: Report[] = [];

  constructor(private logsService: LogsService) {}

  ngOnInit() {
    this.getPilotReport();
  }

  getPilotReport() {
    this.logsService.getPilotReport().subscribe((data: Report[]) => {
      // Filter out entries with null values
      this.reportData = data.map(entry => this.filterNullValues(entry));

      // Separate filtered data into three categories
      this.separateReports(this.reportData);
    });
  }

  // Helper function to filter out null values from an object
  filterNullValues(obj: Report): Report {
    const filteredObj: any = {};
    Object.keys(obj).forEach(key => {
      if (obj[key] !== null && obj[key] !== undefined) {
        filteredObj[key] = obj[key];
      }
    });
    return filteredObj as Report;
  }

  // Function to separate report data into three groups based on DisplayName
  separateReports(data: Report[]): void {
    data.forEach(entry => {
      if (entry && entry['displayName']) { // Check for displayName specifically
        if (entry['displayName'] === 'Rating') {
          this.ratingReports.push(entry);
        } else if (entry['displayName'] === 'Medical') {
          this.medicalReports.push(entry);
        } else {
          this.otherReports.push(entry);
        }
      } else {
        console.warn('Entry with undefined displayName:', entry);
      }
    });

    // Log the separated reports for verification
    console.log('ratingReports', this.ratingReports);
    console.log('medicalReports', this.medicalReports);
    console.log('otherReports', this.otherReports);
  }

  // Method to extract keys from an object
  getObjectKeys(entry: Report): string[] {
    return Object.keys(entry);
  }
}
