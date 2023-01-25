import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { initializeApp } from 'firebase/app'
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  phoneNumber: string = '';
  otp: string = '';
  auth:any;
  appVerifier:any;
  confirmationResult:any;
  isLoading:boolean = false;
  
  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    const app = initializeApp(environment.firebaseConfig)
    this.auth = getAuth(app);
    this.appVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response: any) => {
      }
    }, this.auth);
  }

  sendOTP() {
    this.isLoading = true;
    const phoneNumber = '+91' + this.phoneNumber;
    signInWithPhoneNumber(this.auth, phoneNumber, this.appVerifier)
      .then((res) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.isLoading = false;
        this.confirmationResult = res;
        this.snackbarService.show('OTP sent successfully !','Success')
        // ...
      }).catch((error) => {
        this.isLoading = false;
        this.snackbarService.show(error,'Error')
        // Error; SMS not sent
        // ...
      });

  }


  verifyOTP() {
    this.isLoading = true;
    this.confirmationResult.confirm(this.otp).then((result:any) => {
      // User signed in successfully.
      this.isLoading = false;
      const user = {
        accessToken: result.user.accessToken,
        uid: result.user.uid,
        phoneNumber: result.user.phoneNumber,
      };
      this.authService.handleAuthentication(user.accessToken, user)
      this.snackbarService.show('Logged In Successfully !','Success')
      // ...
    }).catch((error:any) => {
      this.isLoading = false;
      this.snackbarService.show(error,'Error')
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

}
