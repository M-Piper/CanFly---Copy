interface IObjectKeys {
  [key: string]: string | number | Date | boolean | undefined;
}

export interface Flight extends IObjectKeys{
    Id?: number;
    Date?: Date;
    AircraftTypeID? : number;
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
    InstrumentActualTime?: number;
    InstrumentHoodTime?: number;
    InstrumentSimulatorDualTime?: number;
    InstrumentApproachesCount?: number;
    CrossCountryDayDualTime?: number;
    CrossCountryDayPICTime?: number;
    CrossCountryNightDualTime?: number;
    CrossCountryNightPICTime?: number;
    CrossCountryDistance?: number;
    RouteFrom?: string;
    RouteVia?: string;
    RouteTo?: string;
    DualInstructionGivenTime?: number;
    FloatTime?: number;
    VFRSimulatorDualTime?: number;
    isSelected?: boolean;
  }
  