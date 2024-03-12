interface IObjectKeys {
  [key: string]: string | number | Date | boolean | undefined;
}

export interface Flight extends IObjectKeys{
    Id?: number;
    Date?: Date;
    AircraftType? : string;
    EngineType?: string;
    Registration?: string;
    PilotInCommand?: string;
    StudentOrCoPilot?: string;
    ActivityExercises?: string;
    SingleEngineDayDualTime?: number;
    SingleEngineDayPICTime?: number;
    SingleEngineNightDualTime?: number;
    SingleEngineNightPICTime?: number;
    MultiEngineDayDualTime?: number;
    MultiEngineDayPICTime?: number;
    MultiEngineDaySICTime?: number;
    MultiEngineNightDualTime?: number;
    MultiEngineNightPICTime?: number;
    MultiEngineNightSICTime?: number;
    InstrumentIMC?: number;
    InstrumentHood?: number;
    InstrumentFTD?: number;
    InstrumentApproachesCount?: number;
    CrossCountryDayDualTime?: number;
    CrossCountryDayPICTime?: number;
    CrossCountryNightDualTime?: number;
    CrossCountryNightPICTime?: number;
    RouteFrom?: string;
    RouteVia?: string;
    RouteTo?: string;
    DualInstructionGivenNotes?: string;
    FloatTimeNotes?: string;
    VFRSimulatorNotes?: string;
    isSelected?: boolean;
  }
  