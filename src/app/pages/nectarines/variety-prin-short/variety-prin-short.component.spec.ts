import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietyPrinShortComponent } from './variety-prin-short.component';

describe('VarietyPrinShortComponent', () => {
  let component: VarietyPrinShortComponent;
  let fixture: ComponentFixture<VarietyPrinShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarietyPrinShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarietyPrinShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
