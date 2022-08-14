export interface ChartData {
  labels: string[];
  datasets: {
    backgroundColor: string[];
    data: number[];
  }[];
}

export type ChartProps = {
  data: ChartData;
  // width: number = 340;
  // height: number = 340;
  // chartId?: string;
  // cssClass?: string;
  // styles?: PropType<Partial<CSSStyleDeclaration>>;
  // plugins?: PropType<Plugin<"pie">[]>;
};
