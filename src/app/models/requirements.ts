import { NumberValueAccessor } from "@angular/forms";

interface IObjectKeys {
    [key: string]: string | undefined;
  }
  
  export interface Requirements extends IObjectKeys{
    displayName? : string;
    HoursStatus? : string;
    CrossCountryStatus? : string;
  }  