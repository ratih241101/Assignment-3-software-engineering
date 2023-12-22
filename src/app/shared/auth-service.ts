// auth-service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthModel, LoginResponse, Merchant } from './auth-model';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient) {}

    // Method for user signup
    signupUser(name: string, email: string, password: string): Observable<any> {
        const authData: AuthModel = { name, email, password };
        return this.http.post<any>('http://localhost:3001/sign-up/', authData);
    }

    // Method for user login
    loginUser(email: string, password: string): Observable<LoginResponse> { // Using LoginResponse for the response type
        const authData: AuthModel= { email, password };
        return this.http.post<LoginResponse>('http://localhost:3001/login/', authData)
        
    }

    // Get all merchants
    getMerchants(): Observable<Merchant[]> {
    return this.http.get<Merchant[]>('http://localhost:3001/merchants/');
    }

    // Get a single merchant by ID
    getMerchantById(_id: string): Observable<Merchant> {
    return this.http.get<Merchant>(`http://localhost:3001/merchants/${_id}`);
    }

    // Create a new merchant
    createMerchant(merchantData: FormData): Observable<any> {
        return this.http.post<any>('http://localhost:3001/merchants/', merchantData);
      }

    // Update a merchant
    updateMerchant(_id: string, merchantData: Partial<Merchant>): Observable<any> {
        return this.http.put<Merchant>(`http://localhost:3001/merchants/${_id}`, merchantData);
      }

    // Delete a merchant
    deleteMerchant(_id: string): Observable<any> {
    return this.http.delete(`http://localhost:3001/merchants/${_id}`);
    }
}
