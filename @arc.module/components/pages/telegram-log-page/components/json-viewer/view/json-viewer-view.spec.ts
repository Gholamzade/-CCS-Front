import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonViewer } from './json-viewer-view';

describe('JsonViewer', () => {
  let component: JsonViewer;
  let fixture: ComponentFixture<JsonViewer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JsonViewer]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
