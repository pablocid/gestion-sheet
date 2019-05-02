import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietyPrintComponent } from './variety-print.component';

describe('VarietyPrintComponent', () => {
  let component: VarietyPrintComponent;
  let fixture: ComponentFixture<VarietyPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarietyPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarietyPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
