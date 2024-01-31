import { ITableColumn, ITableSettings } from "@tinqjs/tinjs-tw";

export const DEFAULT_COLUMNS_TEST: ITableColumn[] = [
  { name: "No", key: "no", width: 50 },
  { name: "Name", key: "name", width: 250 },
  { name: "Age", key: "age", width: 250 },
  { name: "Status", feature: "status", width: 250 },
  { name: "", feature: "action", width: 250 },
];
