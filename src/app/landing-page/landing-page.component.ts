import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth-service';
import { SignUpResponse } from '../shared/auth-model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{

  signUpForm!: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const name = this.signUpForm.value.name;
      const email = this.signUpForm.value.email;
      const password = this.signUpForm.value.password;

      this.authService.signupUser(name, email, password).subscribe(
        (response: SignUpResponse) => {
          console.log('SignUp successful:', response.message);
          // Handle response, such as redirecting or displaying a success message
        },
        error => {
          console.error('SignUp failed:', error);
          // Handle error
        }
      );
    } else {
      console.error('SignUp form is invalid');
      // Handle invalid form
    }
  }
  
  imagePaths: string[] = [
    'assets/Images/secimage.jpg',
    'assets/Images/secimage.jpg',
    'assets/Images/secimage.jpg',
  ];
  @ViewChild('gallary') gallary!: ElementRef;
  @ViewChild('about') about!: ElementRef;
  @ViewChild('book') signup!: ElementRef;
  @ViewChild('services') whyus!: ElementRef;

  scrollToSignUp() {
    this.signup.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  scrollToWhyUs() {
    this.whyus.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  scrollToGallery() {
    this.gallary.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToAbout() {
    this.about.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}
