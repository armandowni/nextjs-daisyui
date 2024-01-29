import { useEffect, useMemo, useState } from "react";
import { BehaviorSubject, Observable, Subject, tap } from "rxjs";
export declare type IObservableHandler<T> = { (e: T): void };
export const useSubject = <T>(
  initialValue?: T
): [
  T | undefined,
  IObservableHandler<T>,
  Observable<T | undefined>,
  Error | undefined
] => {
  const source = useMemo(() => new BehaviorSubject(initialValue), []);
  const obs = useMemo(() => source.asObservable(), [source]);
  const [innerState, setInnerState] = useState<T | undefined>(initialValue);
  const [error, setError] = useState<Error>();
  const setState = (v: T) => source.next(v);
  useEffect(() => {
    const subs = obs.subscribe({
      next: (item) => setInnerState(item),
      error: (err) => setError(err),
    });
    return () => {
      subs.unsubscribe();
      source.complete();
    };
  }, []);
  return [innerState, setState, obs, error];
};
export const useObservable = <T>(
  obs: Observable<T>,
  initialValue?: T,
  dependsOn: any[] = []
): [T | undefined, Error | undefined] => {
  const [state, setState] = useState<T | undefined>(initialValue);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    const subs = obs.subscribe({
      next: (item) => setState(item),
      error: (err) => setError(err),
    });
    return () => subs.unsubscribe();
  }, dependsOn);
  return [state, error];
};
export const useObservableState = <T, V>(
  handler: (source: Observable<T>) => Observable<V>,
  initialValue?: V
): [V | undefined, IObservableHandler<T>, Error | undefined] => {
  const [state, setState] = useState<V | undefined>(initialValue);
  const [error, setError] = useState<Error>();
  const sub = useMemo(() => new Subject<T>(), []);
  const obs = useMemo(() => sub.asObservable().pipe(handler), [sub]);
  const eventHandler = (e: T) => sub.next(e);
  useEffect(() => {
    const subscription = obs.subscribe({ next: setState, error: setError });
    return () => {
      sub.complete();
      subscription.unsubscribe();
    };
  }, []);
  return [state, eventHandler, error];
};
export const useEventHandler = <T extends any, V>(
  handler: (source: Observable<T>) => Observable<V>
): [IObservableHandler<T>, V | undefined, Error | undefined] => {
  const source = useMemo(() => new Subject<T>(), []);
  const obs = useMemo(() => source.asObservable(), [source]);
  const [error, setError] = useState<Error>();
  const [state, setState] = useState<V>();
  useEffect(() => {
    const subs = obs
      .pipe(handler)
      .subscribe({ next: setState, error: setError });
    return () => {
      source.complete();
      subs.unsubscribe();
    };
  }, []);
  return [
    (e: any) => source.next(e ? (e.target ? e.target.value : e) : e),
    state,
    error,
  ];
};
