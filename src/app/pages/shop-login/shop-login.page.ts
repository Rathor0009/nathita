import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './shop-login.page.html',
  styleUrls: ['./shop-login.page.scss'],
})
export class ShopLoginPage implements OnInit {
  // form: any = {
  //   email: null,
  //   password: null
  // };
  // isLoading=false
  // isLoginFailed = false;
  // errorMessage = '';
  loginForm:FormGroup
  isLoggedIn = false;
  errorMessage: any;
 
  constructor(public formBuilder: FormBuilder,private router:Router,private authService: AuthService,private alertController:AlertController,
    private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password:['',[Validators.required,]]
    })
  }
  get errorControl() {
    return this.loginForm.controls;
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: this.errorMessage,
      message: this.errorMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async onSubmit() {
 this.isLoggedIn=true
 if (!this.loginForm.valid) {
  console.log('Please provide all the required values!')
  return false;
}else{
    
    this.authService.shopUserSignin(this.loginForm.get('phone')?.value, this.loginForm.get('password')?.value).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);

        this.isLoggedIn = true;

        this['router'].navigate(['/shop-user-profile'])
        // this.reloadPage();
      },error: err => {
        this.presentAlert()
        this.errorMessage = err.error.message;

        this.isLoggedIn = false;
      }
   
    });}
  }
  reloadPage(): void {
    window.location.reload();
  }
}
