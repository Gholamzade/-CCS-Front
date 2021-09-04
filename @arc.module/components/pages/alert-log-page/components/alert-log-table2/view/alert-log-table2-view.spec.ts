import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { AlertLogTable2View } from './alert-log-table2-view';

describe('AlertLogTable2View', () => {
  let component: AlertLogTable2View;
  let fixture: ComponentFixture<AlertLogTable2View>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertLogTable2View],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertLogTable2View);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
