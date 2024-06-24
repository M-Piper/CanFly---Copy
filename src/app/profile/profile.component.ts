import { Component, OnInit } from '@angular/core';
import { LogsService, Profile } from '../logs.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileData: Profile[] = [];

  constructor(private logsService: LogsService) { }

  ngOnInit(): void {
    this.logsService.getProfile().subscribe((data: Profile[]) => {
        this.profileData = data;
        console.log(this.profileData);
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

}
