import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../shared/auth-service';
import { Merchant } from '../shared/auth-model';

@Component({
  selector: 'app-review-merchant-registration',
  templateUrl: './review-merchant-registration.component.html',
  styleUrls: ['./review-merchant-registration.component.css']
})
export class ReviewMerchantRegistrationComponent implements OnInit {
  items: Merchant[] = [];
  messageSent: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadMerchants();
  }

  loadMerchants() {
    this.authService.getMerchants().subscribe(
      (data: Merchant[]) => {
        this.items = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Failed to get merchants', error);
      }
    );
  }

  approveItem(item: Merchant) {
    if (item._id && !item.isApproved && item.status !== 'Rejected') {
      this.authService.updateMerchant(item._id, { status: 'Approved' })
        .subscribe(
          () => {
            console.log('Merchant approved successfully');
            const index = this.items.findIndex(x => x._id === item._id);
            if (index !== -1) {
              this.items[index].status = 'Approved';
              this.items[index].isApproved = true;
            }
          },
          (error: HttpErrorResponse) => {
            console.error('Failed to approve merchant', error);
          }
        );
    }
  }

  rejectItem(item: Merchant, rejectReason: string) {
    if (item._id && !item.isApproved) {
      const updateData = {
        status: 'Rejected',
        rejectReason: rejectReason
      };
      this.authService.updateMerchant(item._id, updateData)
        .subscribe(
          () => {
            console.log('Merchant rejected successfully');
            const index = this.items.findIndex(x => x._id === item._id);
            if (index !== -1) {
              this.items[index].status = 'Rejected';
            }
          },
          (error: HttpErrorResponse) => {
            console.error('Failed to reject merchant', error);
          }
        );
    }
  }
}
