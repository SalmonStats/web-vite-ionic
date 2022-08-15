export enum ChartType {
  PIE = "pie",
  BAR = "bar",
}

// Pie Chart
export interface ChartOptions {
  chart: ChartOption;
  labels: string[];
}

interface ChartOption {
  width: number;
  type: ChartType;
}
