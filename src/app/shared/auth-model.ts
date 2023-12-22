// auth-model.ts
//for login and sign-up purposes
export interface AuthModel {
    name?: string; // 'name' is now optional
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    message?: string; // Optional message field
  }
  export interface SignUpResponse {
    message: string;
  }


  //for register merchant
  export interface Document {
    name: string;
    description: string;
    filePath: string;
  }
  //for  register merchant
  export interface Merchant {
    _id?: string; // Optional because it's assigned by the database
    name: string;
    contactNumber: string;
    email: string;
    companyDescription: string;
    document: Document;
    isApproved?: boolean;
    status?: string; // Include this if you're using status in your component
    messageSent?: boolean;
  }