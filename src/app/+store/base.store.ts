import { BehaviorSubject, Observable, map, distinctUntilChanged } from 'rxjs';

export class BaseStore<T> {
  private state$: BehaviorSubject<T>;
  private storeName: string;
  private saveToLocal: boolean;
  private storageKeys: string[];

  constructor(initialState: T, name: string, save: boolean = false, storageKeys: string[] = []) {
    this.state$ = new BehaviorSubject<T>(initialState);
    this.storeName = name;
    this.saveToLocal = save;
    this.storageKeys = storageKeys;
  }

  get state(): T {
    return this.state$.getValue();
  }

  select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged(),
    );
  }

  setState(newState: Partial<T>) {
    console.log(`🔥 TCL: SETSTATE -> ${this.storeName.toUpperCase()}`, newState);
    this.state$.next({
      ...this.state,
      ...newState,
    });
    if (this.saveToLocal) {

      // let localState = {}
      localStorage.setItem(`${this.storeName}`, JSON.stringify(this.state));
      // Object.keys(newState).forEach(key => {
      //   if (this.storageKeys.includes(key)) {
      //     localStorage.setItem(`${key}`, JSON.stringify(newState[key]));
      //   }
      // });
    }
  }
}
