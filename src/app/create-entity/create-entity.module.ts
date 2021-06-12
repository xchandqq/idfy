import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEntityPageRoutingModule } from './create-entity-routing.module';

import { CreateEntityPage } from './create-entity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEntityPageRoutingModule
  ],
  declarations: [CreateEntityPage]
})
export class CreateEntityPageModule {}
