import {BehaviorSubject, Observer} from "rxjs";

export class Store<T> {
  private _state: BehaviorSubject<T>;
  public get state(){
    return this._state.value
  }
  constructor(initialState: T) {
    this._state = new BehaviorSubject(initialState);
  }

  public update(values: Partial<T>){
    this._state.next({...this._state.value, ...values})
  }

  // public set(param: ((value: T) =>  Partial<T>)){
  //   const previousState = this._state.value;
  //   const newValues = param(previousState);
  //   const nextState = {...previousState, ...newValues};
  //   this._state.next(nextState)
  // }

  public subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void)) {
    return this._state.subscribe(observerOrNext);
  }
}
