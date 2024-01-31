import { filter, map, merge, switchMap, tap } from "rxjs";
import { ActionTypes } from "../types";
import { addDataTest, deleteDataTest, editDataTest } from "./remote";
import { createSignal } from "@react-rxjs/utils";

export const [testSignals$, emitTest] = createSignal<ActionTypes>();
export const [testReloadSignals$, emitTestReload] = createSignal<any>();

export const TEST_ADD = (payload: any) => {
  emitTest({ type: "add", payload });
};
export const TEST_EDIT = (payload: any) => {
  emitTest({ type: "edit", payload });
};
export const TEST_DELETE = (payload: any) => {
  emitTest({ type: "delete", payload });
};

const onAdd = testSignals$.pipe(
  filter((test) => test.type === "add"),
  map((test) => test.payload),
  map((test) => ({ ...test, password: "admin123" })),
  // tap(console.log)
  switchMap((result) => addDataTest(result)),
  tap(() => emitTestReload({}))
);

const onEdit = testSignals$.pipe(
  filter((test) => test.type === "edit"),
  map((test) => test.payload),
  // tap(console.log),
  switchMap((test) => editDataTest(test.id, test.data)),
  tap(() => emitTestReload({}))
);

const onDelete = testSignals$.pipe(
  filter((test) => test.type === "delete"),
  map((test) => test.payload),
  switchMap((test) => deleteDataTest(test.id)),
  tap(() => emitTestReload({}))
);

export const testListeners$ = merge(onAdd, onEdit, onDelete);

export const query$ = merge(testReloadSignals$);
