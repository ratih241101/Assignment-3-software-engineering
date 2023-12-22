import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReviewMerchantRegistrationComponent } from './review-merchant-registration/review-merchant-registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageTourismProductComponent } from './manage-tourism-product/manage-tourism-product.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RegisterMerchantComponent } from './register-merchant/register-merchant.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OfficerViewAnalyticsComponent } from './officer-view-analytics/officer-view-analytics.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ReviewComponent } from './review/review.component';
import { MerchantViewAnalyticsComponent } from './merchant-view-analytics/merchant-view-analytics.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MerchantDashboardComponent } from './merchant-dashboard/merchant-dashboard.component';
import { OfficerDashboardComponent } from './officer-dashboard/officer-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReviewMerchantRegistrationComponent,
    DashboardComponent,
    ManageTourismProductComponent,
    RegisterMerchantComponent,
    LandingPageComponent,
    OfficerViewAnalyticsComponent,
    PurchaseComponent,
    ReviewComponent,
    MerchantViewAnalyticsComponent,
    GalleryComponent,
    MerchantDashboardComponent,
    OfficerDashboardComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'review-merchant-registration', component: ReviewMerchantRegistrationComponent },
      { path: 'dashboard', component: DashboardComponent }, 
      { path: 'manage-tourism-product', component: ManageTourismProductComponent }, 
      { path: 'regis', component: RegisterMerchantComponent},
      { path: 'landing-page', component: LandingPageComponent},
      { path: 'officer-view-analytics', component: OfficerViewAnalyticsComponent},
      { path: 'purchase', component: PurchaseComponent},
      { path: 'review', component: ReviewComponent},
      { path: 'merchant-view-analytics', component: MerchantViewAnalyticsComponent},
      { path: 'gallery', component:GalleryComponent},
      { path: 'merchant-dashboard', component:MerchantDashboardComponent},
      { path: 'officer-dashboard', component: OfficerDashboardComponent}

    ]),
    ModalModule.forRoot(),
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
