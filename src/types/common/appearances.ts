import { Appearances } from "@/types/common";

export function getDeviceThemeParams(): Appearances {
  const defaultParam: Appearances = {
    lang: "ja",
    theme: "dark",
  };
  const local: string | null = localStorage.getItem("appearances");
  if (local === null) return defaultParam;
  return JSON.parse(local) ?? defaultParam;
}

export function setDeviceThemeParams(value: Partial<Appearances>): void {
  const parameters: Appearances = Object.assign(getDeviceThemeParams(), value);
  localStorage.setItem("appearances", JSON.stringify(parameters));
}
