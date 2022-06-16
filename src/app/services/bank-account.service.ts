import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BankAccountService {
  constructor() {}

  private totalAmount = 0;

  get bankAccountAmount(): number {
    return this.totalAmount;
  }

  withdraw(amount: number): void {
    amount = amount || -1;
    if (amount < 0) {
      throw new Error("invalid withdraw amount");
    } else if (this.totalAmount - amount < 0) {
      throw new Error("not enough amount to withdraw");
    } else {
      this.totalAmount -= amount;
    }
  }

  deposit(amount: number): void {
    amount = amount || -1;
    if (amount < 0) {
      throw new Error("invalid deposit amount");
    } else {
      this.totalAmount += amount;
    }
  }
}
