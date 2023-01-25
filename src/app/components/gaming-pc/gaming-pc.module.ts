import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamingPcRoutingModule } from './gaming-pc-routing.module';
import { GamingPcComponent } from './gaming-pc.component';


@NgModule({
  declarations: [
    GamingPcComponent
  ],
  imports: [
    CommonModule,
    GamingPcRoutingModule
  ]
})
export class GamingPcModule { }
