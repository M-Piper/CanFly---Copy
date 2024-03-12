import { Component, OnInit } from '@angular/core';
import { LogsService } from '../logs.service';
import { Flight } from '../models/flight';

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css'],
})
export class LogbookComponent implements OnInit {
  logEntries: Flight[] = [];
  selectedRowId: number = -1;
  response: any;
  showErrorMessage: boolean = false;
  showDeletedMessage: boolean = false;
  constructor(private logsService: LogsService) {}

  ngOnInit() {
    this.getLogs();
  }

  getLogs() {
    this.logsService.getLogs().subscribe((data: Flight[]) => {
      this.logEntries = data.map(entry => ({ ...entry, isSelected: false }));
  });
  }

  getKeys(): string[] {
    if (this.logEntries.length > 0) {
      return Object.keys(this.logEntries[0]);
    }
    return [];
  }
  
 toggleCheckbox(rowNumber: number) {
  this.selectedRowId = this.selectedRowId === rowNumber ? -1 : rowNumber;
}

  deleteLog() {
    if (this.selectedRowId > -1) {
      this.logsService.deleteLogs(this.selectedRowId).subscribe(
        (response: any) => {
          this.response = response;
          this.getLogs();
          this.selectedRowId = -1; // Clear selectedRowIds after successful deletion
          this.showDeletedMessage = true;
        },
        (error: any) => {
          console.error('Error deleting log:', error);
        }
      );
      this.showErrorMessage = false;
    } else {
      this.showErrorMessage = true;
    }
  }
}