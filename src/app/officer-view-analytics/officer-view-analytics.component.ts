import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

interface Merchant {
  id: number;
  name: string;
}

@Component({
  selector: 'app-officer-view-analytics',
  templateUrl: './officer-view-analytics.component.html',
  styleUrls: ['./officer-view-analytics.component.css']
})
export class OfficerViewAnalyticsComponent implements OnInit, AfterViewInit {
  @ViewChild('salesChart') salesChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('customerChart') customerChartRef!: ElementRef<HTMLCanvasElement>;
  salesChart: Chart | null = null;
  customerChart: Chart | null = null;
  selectedMerchant: Merchant | null = null;

  merchants: Merchant[] = [
    { id: 1, name: 'Merchant 1' },
    { id: 2, name: 'Merchant 2' },
    { id: 3, name: 'Merchant 3' },
    { id: 4, name: 'Merchant 4' },
    { id: 5, name: 'Merchant 5' },
    { id: 6, name: 'Merchant 6' },
    { id: 7, name: 'Merchant 7' },
    { id: 8, name: 'Merchant 8' },
    { id: 9, name: 'Merchant 9' },
    { id: 10, name: 'Merchant 10'},
  ];

  constructor() { }

  ngOnInit(): void {
    this.selectedMerchant = this.merchants[0];
  }

  ngAfterViewInit(): void {
    //this.generateChart(this.selectedMerchant);
  }

  onMerchantSelect(merchant: Merchant) {
    if (this.selectedMerchant !== null) {
      this.selectedMerchant = merchant;
      if (this.salesChart && this.customerChart) {
        this.salesChart.destroy();
        this.customerChart.destroy();
      }
      this.generateChart(merchant);
    }
  }
  

  generateChart(merchant: Merchant) {
    const productData = this.getProductData(merchant.id);
    const salesContext = this.salesChartRef.nativeElement.getContext('2d');
    const customerContext = this.customerChartRef.nativeElement.getContext('2d');

    if (salesContext && customerContext) {
      this.salesChart = new Chart(salesContext, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: `Sales for ${merchant.name}`,
              data: productData.salesData,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      this.customerChart = new Chart(customerContext, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: `Purchasing Power for ${merchant.name}`,
              data: this.getCustomerPurchasingPower(merchant.id),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  getProductData(merchantId: number) {
    let salesData: number[] = [];

    switch (merchantId) {
      case 1:
        salesData = [20, 25, 30, 35, 40, 45];
        break;
      case 2:
        salesData = [15, 18, 22, 28, 35, 42];
        break;
      case 3:
        salesData = [10, 12, 14, 18, 22, 26];
        break;
      case 4:
        salesData = [22, 26, 30, 34, 38, 42];
        break;
      case 5:
        salesData = [28, 30, 32, 34, 36, 38];
        break;
      case 6:
        salesData = [18, 20, 22, 24, 26, 28];
        break;
      case 7:
        salesData = [12, 14, 16, 18, 20, 22];
        break;
      case 8:
        salesData = [30, 32, 34, 36, 38, 40];
        break;
      case 9:
        salesData = [24, 26, 28, 30, 32, 34];
        break;
      case 10:
        salesData = [16, 18, 20, 22, 24, 26];
        break;
      default:
        break;
    }

    return { salesData };
  }

  getCustomerPurchasingPower(merchantId: number): number[] {
    let customerPurchasingPower: number[] = [];

    switch (merchantId) {
      case 1:
        customerPurchasingPower = [90, 85, 80, 75, 70, 65];
        break;
      case 2:
        customerPurchasingPower = [80, 75, 70, 65, 60, 55];
        break;
      case 3:
        customerPurchasingPower = [70, 65, 60, 55, 50, 45];
        break;
      case 4:
        customerPurchasingPower = [85, 80, 75, 70, 65, 60];
        break;
      case 5:
        customerPurchasingPower = [75, 70, 65, 60, 55, 50];
        break;
      case 6:
        customerPurchasingPower = [82, 78, 74, 70, 66, 62];
        break;
      case 7:
        customerPurchasingPower = [88, 84, 80, 76, 72, 68];
        break;
      case 8:
        customerPurchasingPower = [79, 76, 73, 70, 67, 64];
        break;
      case 9:
        customerPurchasingPower = [86, 83, 80, 77, 74, 71];
        break;
      case 10:
        customerPurchasingPower = [81, 78, 75, 72, 69, 66];
        break;
      default:
        break;
    }

    return customerPurchasingPower;
  }
}
