import { Component, OnInit } from '@angular/core';
import { LogsService, TotalHoursResponse, CompletedRating, pilotName } from '../logs.service';
import { Requirements } from '../models/requirements'; 

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
    totalHours: number = 0;
    pilotFullname: string = 'to CanFly';
    requirementData: Requirements [] = [];
    completedRatings: CompletedRating[] = [];

    constructor(private logsService: LogsService) { }

    ngOnInit() {
      this.logsService.getTotalHours().subscribe((response: TotalHoursResponse) => {
          this.totalHours = response.TotalHours;
      });

      this.logsService.getCompletedRatings().subscribe((ratings: CompletedRating[]) => {
        this.completedRatings = ratings;
        console.log(this.completedRatings);
    });

      this.logsService.getName().subscribe((response: pilotName) => {
          this.pilotFullname = response.FullName;
      });


      // Fetch requirements data
      this.logsService.getRequirements().subscribe((response: Requirements[]) => {
        this.requirementData = this.requirementData = response;
    });
    
  }
}