import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TotalHoursResponse {
    TotalHours: number;
}

export interface pilotName {
  FullName: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  //private readonly APIUrl = "http://localhost:5117/api/CanFly/";
  private readonly APIUrl = "https://canflybackend.azurewebsites.net";
  
  constructor(private http: HttpClient) { }

  getLogs(): Observable<any> {
    return this.http.get(this.APIUrl + 'GetLogs');
  }

  addLogs(newLog: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.APIUrl + 'AddNotes', newLog, { headers });
}


  deleteLogs(id: number): Observable<any> {
    console.log('LOGS SERVICE: delete logs:', id);
    return this.http.delete(this.APIUrl + 'DeleteLogs?id=' + id);
  }

  getTotalHours(): Observable<TotalHoursResponse> {
    return this.http.get<TotalHoursResponse>(this.APIUrl + 'GetTotalHours');
  }

  getName(): Observable<pilotName> {
    return this.http.get<pilotName>(this.APIUrl + 'GetName');
  }

}
