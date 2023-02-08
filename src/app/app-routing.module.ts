import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/homepage/homepage.module').then(m=>m.HomepageModule) },
  { path: 'contact-us', loadChildren: () => import('./components/contact-us/contact-us.module').then(m=>m.ContactUsModule) },
  { path: 'gaming-pc', loadChildren: () => import('./components/gaming-pc/gaming-pc.module').then(m=>m.GamingPcModule) },
  { path: 'product', loadChildren: () => import('./components/product/product.module').then(m=>m.ProductModule) },
  { path: 'checkout', loadChildren: () => import('./components/checkout/checkout.module').then(m=>m.CheckoutModule) },
  { path: 'success', loadChildren: () => import('./components/order-success/order-success.module').then(m=>m.OrderSuccessModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
