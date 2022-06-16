import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { LoginComponent } from "./auth/login/login.component";
import { HelloComponent } from "./hello/hello.component";

const routes: Routes = [
  {
    path: "",
    component: HelloComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "account",
    component: AccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
