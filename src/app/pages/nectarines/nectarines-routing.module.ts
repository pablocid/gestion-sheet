import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeasonComponent } from './season/season.component';
import { VarietiesComponent } from './varieties/varieties.component';
import { VarietyComponent } from './variety/variety.component';
import { VarietyPrintComponent } from './variety-print/variety-print.component';

const routes: Routes = [
  { path: '', component: SeasonComponent },
  {
    path: 'varieties', component: VarietiesComponent,
    children: [
      { path: '', component: VarietyComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NectarinesRoutingModule { }
