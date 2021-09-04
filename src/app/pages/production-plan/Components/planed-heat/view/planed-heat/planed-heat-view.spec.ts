import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanedHeatView } from './planed-heat-view';

describe('PlanedHeatView', () => {
  let component: PlanedHeatView;
  let fixture: ComponentFixture<PlanedHeatView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanedHeatView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanedHeatView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
