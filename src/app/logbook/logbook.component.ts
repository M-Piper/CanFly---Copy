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
    'instrumentIMC' : 'Instrument',
    'instrumentHood' : 'Instrument with Hood',
    'instrumentFTD' : 'Instrument FTD',
    'instrumentApproachesCount' : 'Instrument Approaches',
    'crossCountryDayDualTime' : 'X-Country Day Dual',
    'crossCountryDayPICTime' : 'X-Country Day PIC',
    'crossCountryNightDualTime' : 'X-Country Night Dual',
    'crossCountryNightPICTime' : 'X-Country Night PIC',
    'routeFrom' : 'From',
    'routeVia' : 'Via',
    'routeTo' : 'To',
    'dualInstructionGivenNotes' : 'Dual Instruction Notes',
    'floatTimeNotes' : 'Float Time Notes',
    'vFRSimulatorNotes' : 'VFR Sim Notes',
    'pilotID' :'Pilot ID',
    'takeOffs':'# of Takeoffs',
    'landings':'# of Landings'
  };


  constructor(private logsService: LogsService) {}

  ngOnInit() {
    this.getLogs();
  }

  getLogs() {
    this.logsService.getLogs().subscribe((data: Flight[]) => {
      this.logEntries = data.map(entry => ({ ...entry, isSelected: false }));
      this.determineHiddenColumns(); //add to identify hidden columns
    });
  }

  getKeys(): string[] {
    if (this.logEntries.length > 0) {
      // Filter out the 'isSelected' property
      return Object.keys(this.logEntries[0]).filter(key => key !== 'isSelected');
    }
    return [];
  }
  
 toggleCheckbox(rowNumber: number) {
  this.selectedRowId = this.selectedRowId === rowNumber ? -1 : rowNumber;
}

  deleteLog() {
    if (this.selectedRowId > -1) {
       const selectedEntry = this.logEntries[this.selectedRowId];
      this.logsService.deleteLogs(this.selectedRowId).subscribe(
        (response: any) => {
          this.response = response;
          this.getLogs();
          this.selectedRowId = -1; // Clear selectedRowIds after successful deletion
          this.showDeleteMessage();
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

  showDeleteMessage() {
    this.showDeletedMessage = true;
    setTimeout(() => {
      this.showDeletedMessage = false;
    }, 2000); // Hide the message after 3 seconds
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
    console.log(`Key: ${key}, Alias: ${alias}`);
    return this.columnAliases[key] || key; // Return the display alias if available, otherwise return the original key
  
  }
}