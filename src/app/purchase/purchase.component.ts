import { Component, ElementRef, ViewChild } from '@angular/core';
declare var bootstrap: any; 

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent {
  products = [
    { id: 1, name: 'Product 1', price: 5, Image: 'assets/Images/Alor.jpeg' },
    { id: 2, name: 'Product 2', price: 8, Image: 'assets/Images/Alor.jpeg' },
    { id: 3, name: 'Product 3', price: 9, Image: 'assets/Images/Alor.jpeg' },
    { id: 4, name: 'Product 4', price: 15, Image: 'assets/Images/Alor.jpeg' },
    { id: 5, name: 'Product 5', price: 12, Image: 'assets/Images/Alor.jpeg' },
    { id: 6, name: 'Product 6', price: 20, Image: 'assets/Images/Alor.jpeg' },
  ];

  cartItems: any[] = [];
  showMessage = false; 
  @ViewChild('cartModal') cartModal!: ElementRef; 

  constructor() {}
  openCartModal() {
    const modal = new bootstrap.Modal(this.cartModal.nativeElement);
    modal.show();
  }

  addToCart(product: any) {
    this.cartItems.push(product);
    this.showMessage = true; 
    setTimeout(() => {
      this.showMessage = false; 
    }, 3000);
  }

  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }


  
}
