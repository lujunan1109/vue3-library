export interface TreeDataType {
  id: number;
  label: string;
  [key:string]: any;
  children?: TreeDataType[];
}