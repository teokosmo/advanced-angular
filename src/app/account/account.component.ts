import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription, throwError } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { catchError, take } from "rxjs/operators";
import { BankAccountService } from "../services/bank-account.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
})
export class AccountComponent implements OnInit {
  accountForm: FormGroup;

  errorMsg = "";

  constructor(
    private bankAccountService: BankAccountService,
    formBuilder: FormBuilder
  ) {
    this.accountForm = formBuilder.group({
      amount: [null, [Validators.required]],
    });
  }

  get bankAmount$(): Observable<number> {
    return this.bankAccountService.bankAccountAmount$;
  }

  ngOnInit() {}

  ngOnDestroy() {}

  deposit(): void {
    this.errorMsg = "";
    this.bankAccountService
      .deposit(this.accountForm.value.amount)
      .pipe(
        take(1),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe(
        (x) => console.log("AccountComponent.deposit", x),
        (err) => {
          this.errorMsg = err.message;
        }
      );
  }

  withdraw(): void {
    this.errorMsg = "";
    this.bankAccountService
      .withdraw(this.accountForm.value.amount)
      .pipe(
        take(1),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe(
        (x) => console.log("AccountComponent.withdraw", x),
        (err) => {
          this.errorMsg = err.message;
        }
      );
  }
}
