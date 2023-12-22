import { Component } from '@angular/core';

interface Product {
  name: string;
  image: string;
}

@Component({
  selector: 'app-manage-tourism-product',
  templateUrl: './manage-tourism-product.component.html',
  styleUrls: ['./manage-tourism-product.component.css']
})
export class ManageTourismProductComponent {
  products: Product[] = [
    { name: 'Product 1', image: 'assets/Images/Alor.jpeg' },
    { name: 'Product 2', image: 'assets/Images/secimage.jpg' },
    { name: 'Product 3', image: 'assets/Images/twin tower.jpg' },
  
  ];

  selectedProduct: Product | null = null;
  newProduct: Product = { name: '', image: '' };

  deleteProduct(product: Product) {
    const index = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  editProduct(product: Product) {
    this.selectedProduct = { ...product }; 
    this.openProductModal();
  }
  
  saveChanges() {
    if (this.selectedProduct !== null) {
      const index = this.products.findIndex(p => p === this.selectedProduct);
      if (index !== -1) {
        this.products[index] = { ...this.selectedProduct }; 
      }
      this.closeProductModal();
    }
  }
  
  openProductModal() {
    const productModal = document.getElementById('productModal');
    if (productModal) {
      productModal.classList.add('show');
      productModal.style.display = 'block';
    }
  }

  closeProductModal() {
    const productModal = document.getElementById('productModal');
    if (productModal) {
      productModal.classList.remove('show');
      productModal.style.display = 'none';
    }
    this.selectedProduct = null;
  }

  updateProductName(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.selectedProduct !== null) {
      this.selectedProduct.name = value;
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && this.selectedProduct !== null) {
      this.selectedProduct.image = file.name;
    }
  }

  onNewFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.newProduct.image = file.name; 
    }
  }

 addProduct() {
  if (this.newProduct.name.trim() !== '') {
    const defaultImagePath = 'assets/Images/twin tower.jpg';
    const image = this.newProduct.image.trim() !== '' ? this.newProduct.image : defaultImagePath;

    this.products.push({ ...this.newProduct, image });
    this.newProduct = { name: '', image: '' };
  }
} 
}
