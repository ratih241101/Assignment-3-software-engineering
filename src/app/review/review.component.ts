import { Component } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  products: any[] = [
    { id: 1, name: 'Product A', price: 20, image: '../../assets/Images/secimage.jpg', reviews: [], reviewed: false },
    { id: 2, name: 'Product B', price: 30, image: '../../assets/Images/TwinTower.jpg', reviews: [], reviewed: false },
    { id: 3, name: 'Product C', price: 25, image: '../../assets/Images/secimage.jpg', reviews: [], reviewed: false },
    { id: 4, name: 'Product D', price: 18, image: '../../assets/Images/TwinTower.jpg', reviews: [], reviewed: false },
    { id: 5, name: 'Product E', price: 35, image: '../../assets/Images/secimage.jpg', reviews: [], reviewed: false },
    { id: 6, name: 'Product F', price: 28, image: '../../assets/Images/TwinTower.jpg', reviews: [], reviewed: false },
    { id: 7, name: 'Product G', price: 22, image: '../../assets/Images/secimage.jpg', reviews: [], reviewed: false },
    { id: 8, name: 'Product H', price: 27, image: '../../assets/Images/TwinTower.jpg', reviews: [], reviewed: false },
  ];

  reviewSent: boolean = false;
  reviewData: { rating: number, comment: string } = { rating: 0, comment: '' };
  selectedProductId: number | null = null;

  selectProduct(product: any) {
    this.selectedProductId = product.id;
  }
  submitReview(product: any) {
    if (this.reviewData.rating && this.reviewData.comment) {
      this.reviewSent = true;
        const selectedProductId = this.selectedProductId;
      if (selectedProductId !== null) {
        const selectedProduct = this.products.find(p => p.id === selectedProductId);
        if (selectedProduct) {
          selectedProduct.reviews.push({
            rating: this.reviewData.rating,
            comment: this.reviewData.comment
          });
          selectedProduct.reviewed = true;
        }
      }
  
      this.resetReviewData();
    }
  
    setTimeout(() => {
      this.reviewSent = false;
    }, 3000);
  }
  
  resetReviewData(): void {
    this.reviewData = {
      rating: 0,
      comment: ''
    };
  }
}
