import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { ModalPageModule } from '../modal/modal.module';
;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    RegisterPageModule,
    ModalPageModule

  ],
  declarations: [HomePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
