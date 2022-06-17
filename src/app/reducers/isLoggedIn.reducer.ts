import { Action } from "@ngrx/store";

export function isLoggedInReducer(state = false, action: Action): boolean {
  switch (action.type) {
    case AuthActionType.Login:
      return (action as LoginAction).isLoggedIn;

    case AuthActionType.Logout:
      return (action as LogoutAction).isLoggedIn;

    default:
      return state;
  }
}

export enum AuthActionType {
  Login = "[Home Page] Login",
  Logout = "[Home Page] Logout",
}

export class LoginAction implements Action {
  readonly type = AuthActionType.Login;

  constructor(public isLoggedIn: boolean) {}
}

export class LogoutAction implements Action {
  readonly type = AuthActionType.Logout;

  constructor(public isLoggedIn: boolean) {}
}
