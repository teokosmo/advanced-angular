import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

  get bankAmount(): number {
    return this.bankAccountService.bankAccountAmount;
  }

  ngOnInit() {}

  deposit(): void {
    try {
      this.errorMsg = "";
      this.bankAccountService.deposit(this.accountForm.value.amount);
    } catch (err) {
      this.errorMsg = err.message;
    }
  }

  withdraw(): void {
    try {
      this.errorMsg = "";
      this.bankAccountService.withdraw(this.accountForm.value.amount);
    } catch (err) {
      this.errorMsg = err.message;
    }
  }
}
