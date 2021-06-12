import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntityPage } from './entity.page';

const routes: Routes = [
  {
    path: ':id',
    component: EntityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntityPageRoutingModule {}
