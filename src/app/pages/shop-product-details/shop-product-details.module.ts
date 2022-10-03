import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopProductDetailsPageRoutingModule } from './shop-product-details-routing.module';

import { ShopProductDetailsPage } from './shop-product-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopProductDetailsPageRoutingModule
  ],
  declarations: [ShopProductDetailsPage]
})
export class ShopProductDetailsPageModule {}
