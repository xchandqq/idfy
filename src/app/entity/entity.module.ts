import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntityPageRoutingModule } from './entity-routing.module';

import { EntityPage } from './entity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntityPageRoutingModule
  ],
  declarations: [EntityPage]
})
export class EntityPageModule {}
