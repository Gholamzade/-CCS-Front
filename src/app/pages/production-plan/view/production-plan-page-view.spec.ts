import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionPlanPageView } from './production-plan-page-view';

describe('ProductionPlanPageView', () => {
  let component: ProductionPlanPageView;
  let fixture: ComponentFixture<ProductionPlanPageView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionPlanPageView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionPlanPageView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
