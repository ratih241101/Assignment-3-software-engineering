import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-merchant-view-analytics',
  templateUrl: './merchant-view-analytics.component.html',
  styleUrls: ['./merchant-view-analytics.component.css']
})
export class MerchantViewAnalyticsComponent implements OnInit {
  @ViewChild('salesChart') salesChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('customerChart') customerChartRef!: ElementRef<HTMLCanvasElement>;
  salesChart: Chart | null = null;
  customerChart: Chart | null = null;

  constructor() { }

  ngOnInit(): void {
    this.generateChart('product1'); 
  }

  ngAfterViewInit(): void {
    this.generateChart('product1'); 
  }

  onProductChange(event: any) {
    const selectedProduct = event.target.value;
    this.updateChart(selectedProduct);
  }

  generateChart(selectedProduct: string) {
    const productData = this.getProductData(selectedProduct);
    const salesContext = this.salesChartRef.nativeElement.getContext('2d');
    const customerContext = this.customerChartRef.nativeElement.getContext('2d');

    if (salesContext && customerContext) {
      this.salesChart = new Chart(salesContext, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: `Sales for ${selectedProduct}`,
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
              label: `Purchasing Power for ${selectedProduct}`,
              data: this.getCustomerPurchasingPower(selectedProduct),
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

  updateChart(selectedProduct: string) {
    const productData = this.getProductData(selectedProduct);

    if (this.salesChart && this.customerChart) {
      this.salesChart.data.labels = ['January', 'February', 'March', 'April', 'May', 'June'];
      this.salesChart.data.datasets[0].label = `Sales for ${selectedProduct}`;
      this.salesChart.data.datasets[0].data = productData.salesData;
      this.salesChart.update();

      this.customerChart.data.datasets[0].label = `Purchasing Power for ${selectedProduct}`;
      this.customerChart.data.datasets[0].data = this.getCustomerPurchasingPower(selectedProduct);
      this.customerChart.update();
    } else {
      this.generateChart(selectedProduct);
    }
  }

  getProductData(selectedProduct: string) {
    let salesData: number[] = [];

    switch (selectedProduct) {
      case 'product1':
        salesData = [12, 19, 3, 5, 2, 3]; 
        break;
      case 'product2':
        salesData = [7, 11, 5, 8, 3, 9]; 
        break;
      case 'product3':
        salesData = [3, 7, 8, 18, 10, 9]; 
        break;
      default:
        break;
    }

    return { salesData };
  }

  getCustomerPurchasingPower(selectedProduct: string): number[] {
    let customerPurchasingPower: number[] = [];

    switch (selectedProduct) {
      case 'product1':
        customerPurchasingPower = [100, 80, 70, 90, 75, 85]; 
        break;
      case 'product2':
        customerPurchasingPower = [90, 85, 95, 70, 60, 80]; 
        break;
      case 'product3':
        customerPurchasingPower = [75, 60, 80, 85, 90, 95]; 
        break;
      default:
        break;
    }

    return customerPurchasingPower;
  }
}
