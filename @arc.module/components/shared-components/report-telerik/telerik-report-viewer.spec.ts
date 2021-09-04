import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TelerikReportViewer } from './telerik-report-viewer';


describe('TelerikReportView', () => {
  let component: TelerikReportViewer;
  let fixture: ComponentFixture<TelerikReportViewer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TelerikReportViewer]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelerikReportViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
