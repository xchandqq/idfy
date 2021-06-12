import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEntityPage } from './create-entity.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEntityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEntityPageRoutingModule {}
