import { Component, OnInit, OnDestroy } from '@angular/core';
import { NectarinQuery } from './state';
import { ImageDialogComponent } from 'src/app/components/image-dialog/image-dialog.component';
import { GraphDialogComponent } from 'src/app/components/graph-dialog/graph-dialog.component';
import { MatDialog } from '@angular/material';
import { MonitoreoDialogComponent } from '../components/monitoreo/monitoreo.component';
import { take } from 'rxjs/operators';
import { NectarinVariety } from '../classes/nectarin-variety';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-variety',
  templateUrl: './variety.component.html',
  styleUrls: ['./variety.component.css']
})
export class VarietyComponent implements OnInit, OnDestroy {

  constructor(
    private nectQ: NectarinQuery,
    public dialog: MatDialog,
  ) { }

  // public data = this.nectQ.transform();
  public loading$ = this.nectQ.selectLoading();

  public nectarin: NectarinVariety;
  private unsubNectarin: Subscription;
  public activeId$ = this.nectQ.select(s => s.id);
  ngOnInit() {
    this.unsubNectarin = this.nectQ.select(x => x).subscribe(state => {
      this.nectarin = new NectarinVariety(state);
    });
  }
  ngOnDestroy() {
    this.unsubNectarin.unsubscribe();
  }

  // public captureScreen(info: { id: string, name: string }) {
  //   print({ printable: info.id, type: 'html' });
  // }

  openDialog(data): void {
    this.dialog.open(ImageDialogComponent, {
      data
    });
  }

  async openGraphDialog(data) {
    this.dialog.open(GraphDialogComponent, { data });
  }

  async openMonitoreoPresiones(data) {
    this.dialog.open(MonitoreoDialogComponent, { data });
  }

}
