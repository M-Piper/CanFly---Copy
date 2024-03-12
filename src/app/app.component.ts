import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LogsService } from './logs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  export class AppComponent implements OnInit{
    title = 'CanFly';
    logs: any[] = [];

    constructor(private logsService: LogsService) { }

    ngOnInit() {
      this.refreshLogs();
    }
  
    refreshLogs() {
      this.logsService.getLogs().subscribe(data => {
        this.logs = data;
      });
    }
  
    addLogs() {
      const newLog = (<HTMLInputElement>document.getElementById("newLogs")).value;
      this.logsService.addLogs(newLog).subscribe(data => {
        alert(data);
        this.refreshLogs();
      });
    }
  
    deleteLogs(id: any) {
      this.logsService.deleteLogs(id).subscribe(data => {
        alert(data);
        this.refreshLogs();
      });
    }
  }