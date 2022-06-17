import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap, first } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BankAccountService {
  constructor() {}

  private totalAmount$ = new BehaviorSubject(0);

  get bankAccountAmount$(): Observable<number> {
    return this.totalAmount$.asObservable();
  }

  deposit(amount: number): Observable<number> {
    amount = amount || -1;
    return this.totalAmount$.pipe(
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
    );

    /*
    return of(amount).pipe(withLatestFrom)
    */
  }

  withdraw(amount: number): Observable<number> {
    amount = amount || -1;
    return this.totalAmount$.pipe(
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
    );
  }
}
