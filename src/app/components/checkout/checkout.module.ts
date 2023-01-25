import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { LoginComponent } from '../auth/login/login.component';
import { AuthComponent } from '../auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
