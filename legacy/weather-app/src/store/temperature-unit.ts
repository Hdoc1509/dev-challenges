import { create } from "zustand";
import { TEMPERATURE_UNIT, type TemperatureUnit } from "@/consts";

type State = {
  unit: TemperatureUnit;
};

type Action = {
  setUnit: (unit: TemperatureUnit) => void;
};

export const useTemperatureUnitStore = create<State & Action>()((set) => ({
  unit: TEMPERATURE_UNIT.CELSIUS,
  setUnit: (unit: TemperatureUnit) => set({ unit }),
}));
