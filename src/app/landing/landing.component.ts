import { Component, OnInit } from '@angular/core';
import { LogsService, TotalHoursResponse, pilotName } from '../logs.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
    totalHours: number = 0;
    pilotFullname: string = 'to CanFly';

    constructor(private logsService: LogsService) { }

    ngOnInit() {
      this.logsService.getTotalHours().subscribe((response: TotalHoursResponse) => {
          this.totalHours = response.TotalHours;
      });

      this.logsService.getName().subscribe((response: pilotName) => {
          this.pilotFullname = response.FullName;

      });
  }
}
