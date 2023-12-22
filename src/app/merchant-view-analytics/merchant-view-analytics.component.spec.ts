import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantViewAnalyticsComponent } from './merchant-view-analytics.component';

describe('MerchantViewAnalyticsComponent', () => {
  let component: MerchantViewAnalyticsComponent;
  let fixture: ComponentFixture<MerchantViewAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantViewAnalyticsComponent]
    });
    fixture = TestBed.createComponent(MerchantViewAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
