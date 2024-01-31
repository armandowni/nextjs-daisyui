import { shareLatest } from "@react-rxjs/core";
import { from, map, switchMap, tap, toArray } from "rxjs";
import { query$ } from "./signal";
import { getDataTestsAll } from "./remote";

export const dataTestTable$ = query$.pipe(
  switchMap((query) =>
    getDataTestsAll().pipe(
      switchMap((result) => result?.json()),
      switchMap((tests: any) =>
        from(tests?.data).pipe(
          map((test: any, index) => ({
            ...test,
            no: index + 1,
          })),
          toArray(),
          // tap(console.log)
        )
      )
    )
  ),
  shareLatest()
);
