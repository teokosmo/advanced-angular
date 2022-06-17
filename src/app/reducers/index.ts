import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import { balanceReducer } from "./balance.reducer";
import { isLoggedInReducer } from "./isLoggedIn.reducer";

export interface AppState {
  isLoggedIn: boolean;
  balance: number;
}

export const reducers: ActionReducerMap<AppState> = {
  isLoggedIn: isLoggedInReducer,
  balance: balanceReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
