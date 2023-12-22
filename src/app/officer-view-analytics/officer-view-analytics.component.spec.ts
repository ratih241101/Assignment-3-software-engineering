import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerViewAnalyticsComponent } from './officer-view-analytics.component';

describe('OfficerViewAnalyticsComponent', () => {
  let component: OfficerViewAnalyticsComponent;
  let fixture: ComponentFixture<OfficerViewAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficerViewAnalyticsComponent]
    });
    fixture = TestBed.createComponent(OfficerViewAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
