export type ICell = {
  index: number;
  row: number;
  col: number;
  grid: number;
  gIndex: number;
  disabled: boolean;
  value?: number;
  group?: number[]
}