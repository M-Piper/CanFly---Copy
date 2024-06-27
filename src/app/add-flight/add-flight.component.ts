import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogsService}from '../logs.service';
import { Flight } from '../models/flight';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']

})
export class AddFlightComponent implements OnInit {
  flightForm!: FormGroup;
  selectedEngineType!: string; // To store the Engine type selected from dropdown
  displayCrossCountry: boolean = false; // To toggle the visibility of Cross Country fields
  selectedNoteType: string = ''; //store variable from notes dropdown
  showMessage: boolean = false;
  displayInstrument: boolean = false; // To toggle the visibility of Instrument fields
  selectedAircraftType!: string; // Store aircraft type drop down

  constructor(private fb: FormBuilder, private logsService: LogsService) { }

  ngOnInit() {
    this.flightForm = this.fb.group({
      date: [null],
      aircraftType: [null],
      aircraftCategory: [null],
      registration: [null],
      pilotInCommand: [null],
      studentOrCoPilot: [null],
      activityExercises: [null],

      // This represents your dropdown selection
      flightType: [null],

      // Single fields
      singleEngineDayDualTime: [null],
      singleEngineDayPICTime: [null],
      singleEngineNightDualTime: [null],
      singleEngineNightPICTime: [null],

      // Multi-engine fields
      multiEngineDayDualTime: [null],
      multiEngineDayPICTime: [null],
      multiEngineDaySICTime: [null],
      multiEngineNightDualTime: [null],
      multiEngineNightPICTime: [null],
      multiEngineNightSICTime: [null],

      // Instrument fields
      instrumentActualTime: [null],
      instrumentHoodTime: [null],
      instrumentSimulatorDualTime: [null],
      instrumentApproachesCount: [null],

      // Cross Country fields
      crossCountryDayDualTime: [null],
      crossCountryDayPICTime: [null],
      crossCountryNightDualTime: [null],
      crossCountryNightPICTime: [null],
      crossCountryDistance: [null],

      routeFrom: [null],
      routeVia: [null],
      routeTo: [null],

      dualInstructionGivenTime: [null],
      floatTime: [null],
      VFRSimulatorDualTime: [null],
      CAF: [null],
      takeOffs: [null],
      landings: [null],
      circuits: [null],
      omitFromReports: [null],
      untetheredBalloon: [null],
      altitudeBalloon: [null],
      outsideCanada: [null],      
      launchLocationGlider: [null],
      distanceGlider: [null],
      launchTypeGlider: [null]
    });

  }
  
  onAircraftTypeChange(event: Event): void {
    this.selectedAircraftType = (<HTMLSelectElement>event.target).value;
}
  onEngineTypeChange(event: Event): void {
    // Set the selected activity type based on the dropdown selection
    this.selectedEngineType = (<HTMLSelectElement>event.target).value;
  }

  showCrossCountryInputs(): void {
    // Toggle the Cross Country display flag
    this.displayCrossCountry = !this.displayCrossCountry;
  }

  showInstrumentInputs(): void {
    // Toggle the Cross Country display flag
    this.displayInstrument = !this.displayInstrument;
    }
    

  onNoteTypeChange(event: any) {
    this.selectedNoteType = event.target.value;
}


  addFlight() {
      const flightData: Flight = this.flightForm.value;
      this.logsService.addLogs(flightData).subscribe({
        next: (response: any) => {
          console.log('Log added successfully:', response);
          this.flightForm.reset();
          this.showMessage = true;
        },
        error: (error: any) => {
          console.error('Error adding log:', error);
        },
        complete: () => {
          console.info('Subscription completed.');
          this.showMessage = true;
        }
      });
      //add form validation and error handling
  }
}