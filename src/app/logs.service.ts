import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TotalHoursResponse {
    TotalHours: number;
}

export interface pilotName {
  FullName: string;
}

export interface CompletedRating {
  LongName: string;
  ShortName: string;
  DateAwarded: Date;
}

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  province: string;
  dob: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogsService {
 //private readonly APIUrl = "http://localhost:5117/api/CanFly/";
 // private readonly APIUrl = "https://canfly-backend.azurewebsites.net/api/CanFly/";
  private readonly APIUrl = "https://canflypipeline-production.up.railway.app/api/CanFly/";
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


  // deleteLogs(id: number): Observable<any> {
  //   console.log('LOGS SERVICE: delete logs:', id);
  //   return this.http.delete(this.APIUrl + 'DeleteLogs?id=' + id);
  // }

  deleteLogs(id: number): Observable<any> {
    return this.http.delete(`${this.APIUrl}${id}`);
  }
  
  getTotalHours(): Observable<TotalHoursResponse> {
    return this.http.get<TotalHoursResponse>(this.APIUrl + 'GetTotalHours');
  }

  getName(): Observable<pilotName> {
    return this.http.get<pilotName>(this.APIUrl + 'GetName');
  }

  getPilotReport(): Observable<any> {
    return this.http.get(this.APIUrl + 'GetPilotReport');
  }
  
  getRequirements(): Observable<any> {
    return this.http.get<any>(this.APIUrl + 'GetRequirementSummary');
}

getCompletedRatings(): Observable<CompletedRating[]> {
  return this.http.get<CompletedRating[]>(this.APIUrl + 'GetCompletedRatings');
}

getProfile(): Observable<Profile[]> {
  return this.http.get<Profile[]>(this.APIUrl + 'GetProfile');
}

}
