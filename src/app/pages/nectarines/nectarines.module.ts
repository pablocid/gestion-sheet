import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NectarinesRoutingModule } from './nectarines-routing.module';
import { VarietiesComponent } from './varieties/varieties.component';
import { SeasonComponent } from './season/season.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from 'src/app/modules/share.module';
import { VarietyComponent } from './variety/variety.component';
import { VarietyPrintComponent } from './variety-print/variety-print.component';
import { GraphCalibrePrintComponent } from './variety-print/graph-calibre/graph-calibre.component';
import { VarietyPrinShortComponent } from './variety-prin-short/variety-prin-short.component';
import { MonitoreoDialogComponent } from './components/monitoreo/monitoreo.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { CardInfoComponent } from './components/card-info/card-info.component';

@NgModule({
  declarations: [
    VarietiesComponent,
    SeasonComponent,
    VarietyComponent,
    VarietyPrintComponent,
    GraphCalibrePrintComponent,
    VarietyPrinShortComponent,
    MonitoreoDialogComponent,
    AutocompleteComponent,
    CardInfoComponent
  ],
  entryComponents: [MonitoreoDialogComponent],
  imports: [
    CommonModule,
    NectarinesRoutingModule,
    MaterialModule,
    SharedModule,
    NgxChartsModule
  ]
})
export class NectarinesPageModule { }
