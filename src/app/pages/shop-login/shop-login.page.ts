import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './shop-login.page.html',
  styleUrls: ['./shop-login.page.scss'],
})
export class ShopLoginPage implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoading=false
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private router:Router,private authService: AuthService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }
  onSubmit(): void {

    const { phone, password } = this.form;
    
    this.authService.shopUserSignin(phone, password).subscribe({
      next: data => {
        console.log(data);
        
        this.tokenStorage.saveToken(data.token);

console.log(this.tokenStorage);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this['router'].navigate(['/shop-user-profile'])
        // this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;

        this.isLoginFailed = true;
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
