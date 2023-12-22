import { Component } from '@angular/core';
import { AuthService } from '../shared/auth-service'; // Update with the correct path
import { Merchant, Document as DocumentInfo } from '../shared/auth-model'; // Assuming these are now in auth-model.ts

@Component({
  selector: 'app-register-merchant',
  templateUrl: './register-merchant.component.html',
  styleUrls: ['./register-merchant.component.css']
})
export class RegisterMerchantComponent {
  merchant: Merchant = {
    name: '',
    contactNumber: '',
    email: '',
    companyDescription: '',
    document: { name: '', description: '', filePath: '' } // Update as per new interface
  };

  documentInfo: DocumentInfo = {
    name: '',
    description: '',
    filePath: ''
  };

  selectedDocument: File | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {} // Inject AuthService

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedDocument = fileList[0];
      // Assuming the document name and description are set elsewhere
    }
  }

  onSubmit(): void {
    if (!this.merchant.name || !this.merchant.contactNumber || !this.merchant.email || !this.merchant.companyDescription) {
      this.errorMessage = 'All fields are required';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.merchant.name);
    formData.append('contactNumber', this.merchant.contactNumber);
    formData.append('email', this.merchant.email);
    formData.append('companyDescription', this.merchant.companyDescription);

    if (this.selectedDocument) {
      formData.append('document', this.selectedDocument, this.selectedDocument.name);
      // Update documentInfo in the Merchant object
      this.merchant.document.name = this.selectedDocument.name;
      // Additional document info can be appended here
    }

    // Call AuthService to create a new merchant
    this.authService.createMerchant(formData).subscribe(
      response => {
        this.successMessage = 'Merchant registered successfully!';
        this.errorMessage = '';
        this.resetForm();
      },
      error => {
        console.error('Error occurred:', error);
        this.errorMessage = 'Failed to register merchant';
        this.successMessage = '';
      }
    );
  }

  private resetForm(): void {
    this.merchant = {
      name: '',
      contactNumber: '',
      email: '',
      companyDescription: '',
      document: { name: '', description: '', filePath: '' }
    };
    this.selectedDocument = null;
  }
}
