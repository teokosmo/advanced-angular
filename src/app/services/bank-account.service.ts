import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap, first } from "rxjs/operators";
import { AppState } from "../reducers";
import { DepositAction, WithdrawAction } from "../reducers/balance.reducer";

@Injectable({
  providedIn: "root",
})
export class BankAccountService {
  constructor(private store: Store<AppState>) {}

  // private totalAmount$ = new BehaviorSubject(0);

  get bankAccountAmount$(): Observable<number> {
    // return this.totalAmount$.asObservable(); // return observable so that anyone getting reference to our subject cannot modify it (invoke next(), complete() etc)

    return this.store.select("balance");
  }

  deposit(amount: number): Observable<number> {
    amount = amount || -1;
    /* return this.totalAmount$.pipe(
      first(),
      tap(() => {
        if (amount < 0) {
          throw new Error("invalid deposit amount");
        }
      }),
      map((x) => {
        x += amount;
        return x;
      }),
      tap((x) => {
        this.totalAmount$.next(x);
      })
    ); */

    /*
    return of(amount).pipe(withLatestFrom)
    */

    this.store.dispatch(new DepositAction(amount));
    return this.bankAccountAmount$.pipe(first());
  }

  withdraw(amount: number): Observable<number> {
    amount = amount || -1;
    /*  return this.totalAmount$.pipe(
      first(),
      tap((x) => {
        console.log("BankAccountService.withdraw$", x);
        if (amount < 0) {
          throw new Error("invalid withdraw amount");
        } else if (x - amount < 0) {
          throw new Error("no enough to withdraw");
        } else {
          x -= amount;
        }
        this.totalAmount$.next(x);
      })
    ); */

    this.store.dispatch(new WithdrawAction(amount));
    return this.bankAccountAmount$.pipe(first());
  }
}
