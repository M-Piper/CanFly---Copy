import { Component, OnInit } from '@angular/core';
import { LogsService } from '../logs.service';
import { Report } from '../models/report'; // Adjust this import based on your actual model

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportData: Report[] = []; // Assuming Report interface/type matches your JSON structure
Object: any;

  constructor(private logsService: LogsService) {}

  ngOnInit() {
    this.getPilotReport();
  }

  getPilotReport() {
    this.logsService.getPilotReport().subscribe((data: Report[]) => {
      // Filter out entries with null values
      this.reportData = data.map(entry => this.filterNullValues(entry));
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

  // Helper function to determine if a given display name is 'Rating' or 'Medical'
  isRatingOrMedical(displayName: string): boolean {
    return displayName.toLowerCase().includes('rating') || displayName.toLowerCase().includes('medical');
  }


  // Method to extract keys from an object
  getObjectKeys(entry: Report): string[] {
    return Object.keys(entry);
  }
}
