export interface TableColumn {
  field: string;
  header: string;
  styles?: string;
  cell: (any) => any; // arrow function

}
