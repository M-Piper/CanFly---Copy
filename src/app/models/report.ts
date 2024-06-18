import { NumberValueAccessor } from "@angular/forms";

interface IObjectKeys {
    [key: string]: string | number | Date | undefined;
  }
  
  export interface Report extends IObjectKeys{
    DisplayName? : string;
    RatingName? : string;
    RatingDate? : Date;
    RatingStatus? : string;
    MedicalName? : string;
    MedicalDate? : Date;
    TotalTime?: number;
    TotalPIC? : number;
    TotalDual? : number;
    TimeOnType? : number;
    TypeName? : string;
    TotalNight? : number;
    NightNoInstrument? : number;
    TotalInstrument? : number;
    TotalCrossCountry? : number;
    Total30Days? : number;
    TotalLast90Days? : number;
    TotalLast6Months? : number;
    TotalLast12Months? : number;
    TotalLast24Months? : number;
    TotalLast60Months? : number;
    ApproachesLast6Months? : number;
    DaysSincePIC? : number;
    DaysSinceIPC? : number;
    DaysSinceCurrencyUpgrade? : number;
  }  