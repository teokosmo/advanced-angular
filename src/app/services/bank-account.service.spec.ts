import { TestBed } from "@angular/core/testing";

import { BankAccountService } from "./bank-account.service";

describe("BankAccountService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: BankAccountService = TestBed.get(BankAccountService);
    expect(service).toBeTruthy();
  });

  it("should deposit 100", () => {
    const service: BankAccountService = TestBed.get(BankAccountService);

    service.deposit(100);
    expect(service.bankAccountAmount).toEqual(100);
  });

  it("should have 0 amount after deposit 100 and withdraw 100", () => {
    const service: BankAccountService = TestBed.get(BankAccountService);

    service.deposit(100);
    service.withdraw(100);
    expect(service.bankAccountAmount).toEqual(0);
  });

  it("should return error when deposit negative amount", () => {
    const service: BankAccountService = TestBed.get(BankAccountService);

    expect(() => {
      service.deposit(-100);
    }).toThrowError("invalid deposit amount");
  });

  it("should return error when widthdraw an amount more than the current bank account amount", () => {
    const service: BankAccountService = TestBed.get(BankAccountService);

    expect(() => {
      service.withdraw(1000);
    }).toThrowError("not enough amount to withdraw");
  });

  it("should return error when withdraw negative amount", () => {
    const service: BankAccountService = TestBed.get(BankAccountService);

    expect(() => {
      service.withdraw(-100);
    }).toThrowError("invalid withdraw amount");
  });

  it("should return error when withdraw a null amount", () => {
    const service: BankAccountService = TestBed.get(BankAccountService);

    expect(() => {
      service.withdraw(null);
    }).toThrowError("invalid withdraw amount");
  });
});
