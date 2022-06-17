import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { of, BehaviorSubject, Observable } from "rxjs";
import { isPlatformServer } from "@angular/common";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { LoginAction, LogoutAction } from "../reducers/isLoggedIn.reducer";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private localStorageTokenKey = "token";

  isUserLoggedin: BehaviorSubject<boolean>;

  constructor(
    @Inject(PLATFORM_ID) private platform: any,
    private store: Store<AppState>
  ) {
    if (isPlatformServer(this.platform)) {
      this.isUserLoggedin = new BehaviorSubject<boolean>(false);
      return;
    }

    this.isUserLoggedin = new BehaviorSubject<boolean>(
      localStorage.getItem(this.localStorageTokenKey) &&
        localStorage.getItem(this.localStorageTokenKey).length > 0
    );
  }

  login(email: string, password: string) {
    // this.isUserLoggedin.next(true);
    this.store.dispatch(new LoginAction(true));
    return of(true);
  }

  logout() {
    if (isPlatformServer(this.platform)) {
      return;
    }

    localStorage.removeItem(this.localStorageTokenKey);
    // this.isUserLoggedin.next(false);

    this.store.dispatch(new LogoutAction(false));
  }

  getLoggedInStatus(): Observable<boolean> {
    // return this.isUserLoggedin.asObservable();
    return this.store.select("isLoggedIn");
  }
}
