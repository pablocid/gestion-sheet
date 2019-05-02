import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphCalibreComponent } from './graph-calibre.component';

describe('GraphCalibreComponent', () => {
  let component: GraphCalibreComponent;
  let fixture: ComponentFixture<GraphCalibreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphCalibreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphCalibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
