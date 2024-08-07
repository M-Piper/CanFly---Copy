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
  selectedLogEntryID: number | null = null; // Changed to store logEntryID instead of row index
  response: any;
  showErrorMessage: boolean = false;
  showRotateMessage: boolean = false; //pop up used for small devices encouraging user to rotate
  showDeletedMessage: boolean = false;
  hiddenColumns: Set<string> = new Set<string>(); // Set to store hidden column keys

  columnAliases: { [key: string]: string } = {
    'date': 'Date',
    'aircraftTypeID' : 'Plane ID',
    'engineType' : 'Engine Type',
    'registration' : 'Registration',
    'pilotInCommand' : 'Pilot-in-Command',
    'studentOrCoPilot' : 'Student or Co-Pilot',
    'activityExercises' : 'Exercises',
    'singleEngineDayDualTime' : 'Single Day Dual',
    'singleEngineDayPICTime' : 'Single Day PIC',
    'singleEngineNightDualTime' : 'Single Night Dual',
    'singleEngineNightPICTime' : 'Single Night PIC',
    'multiEngineDayDualTime' : 'Multi Day Dual',
    'multiEngineDayPICTime' : 'Mult Day PIC',
    'multiEngineDaySICTime' : 'Multi Day SIC',
    'multiEngineNightDualTime' : 'Multi Night Dual',
    'multiEngineNightPICTime' : 'Multi Night PIC',
    'multiEngineNightSICTime' : 'Multi Night SIC',
    'instrumentActualTime' : 'Instrument Actual',
    'instrumentHoodTime' : 'Instrument with Hood',
    'instrumentSimulatorDualTime' : 'Instrument FTD',
    'instrumentApproachesCount' : 'Instrument Approaches',
    'crossCountryDayDualTime' : 'X-Country Day Dual',
    'crossCountryDayPICTime' : 'X-Country Day PIC',
    'crossCountryNightDualTime' : 'X-Country Night Dual',
    'crossCountryNightPICTime' : 'X-Country Night PIC',
    'crossCountryDistance' : 'X-Country Distance',
    'routeFrom' : 'From',
    'routeVia' : 'Via',
    'routeTo' : 'To',
    'dualInstructionGivenTime' : 'Dual Instruction Given Time',
    'floatTime' : 'Float Time',
    'VFRSimulatorDualTime' : 'VFR Sim Time',
    'pilotID' :'Pilot ID',
    'takeOffs':'# of Takeoffs',
    'landings':'# of Landings'
  };

  constructor(private logsService: LogsService) {}

  ngOnInit() {
    this.getLogs();
    this.showRotateMessage = this.isSmallDevice();
    if (this.showRotateMessage) {
      setTimeout(() => {
        this.showRotateMessage = false;
      }, 2000);
    }
  }

  getLogs() {
    this.logsService.getLogs().subscribe((data: Flight[]) => {
      this.logEntries = data.map(entry => ({ ...entry, isSelected: false }));
      this.determineHiddenColumns(); //add to identify hidden columns
    });
  }

  isSmallDevice(): boolean {
    return window.innerWidth <= 768; // Adjust this breakpoint as needed
  }

  getKeys(): string[] {
    if (this.logEntries.length > 0) {
      // Filter out the 'isSelected' property
      return Object.keys(this.logEntries[0]).filter(key => key !== 'isSelected');
    }
    return [];
  }

  showDeleteMessage() {
    this.showDeletedMessage = true;
    setTimeout(() => {
      this.showDeletedMessage = false;
    }, 2000); // Hide the message after 2 seconds
  }

  toggleCheckbox(rowNumber: number) {
    const selectedEntry = this.logEntries[rowNumber];
   this.selectedLogEntryID = selectedEntry['logEntryID'] as number;
    console.log('selection check', this.selectedLogEntryID);
    console.log('selection selected entry check', selectedEntry);
  }
  
  deleteLog() {
    if (this.selectedLogEntryID !== null && !isNaN(this.selectedLogEntryID)) {
      this.logsService.deleteLogs(this.selectedLogEntryID).subscribe(
        (response: any) => {
          console.log('Delete response:', response);
          this.getLogs(); // Refresh the log entries after deletion
          this.selectedLogEntryID = null; // Clear selection after successful deletion
          this.showDeleteMessage(); // Show the delete confirmation message
        },
        (error: any) => {
          console.error('Error deleting log:', error);
        }
      );
      this.showErrorMessage = false;
    } else {
      console.log('delete error debug', this.selectedLogEntryID);
      this.showErrorMessage = true; // Show an error message if no entry is selected
    }
  }
  
  determineHiddenColumns() {
    const keys = this.getKeys();
    keys.forEach(key => {
      const columnValues = this.logEntries.map(entry => entry[key]);
      // Check if all values in the column (except the header) are null or undefined
      if (columnValues.slice(1).every(value => value === null || value === undefined || value === '')) {
        this.hiddenColumns.add(key);
      } else if (key == 'logEntryID'){
        this.hiddenColumns.add(key);
      }
        else if (key == 'CAF'){
        this.hiddenColumns.add(key);
      }
      else {
        this.hiddenColumns.delete(key);
      }
    });
  }

  isColumnHidden(key: string): boolean {
    return this.hiddenColumns.has(key);
  }

  getColumnAlias(key: string): string {
    const alias = this.columnAliases[key] || key;
    //console.log(`Key: ${key}, Alias: ${alias}`);
    return this.columnAliases[key] || key; // Return the display alias if available, otherwise return the original key
  }
}
