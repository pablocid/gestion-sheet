import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoreoDialogComponent } from './monitoreo.component';

describe('MonitoreoComponent', () => {
  let component: MonitoreoDialogComponent;
  let fixture: ComponentFixture<MonitoreoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoreoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoreoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
