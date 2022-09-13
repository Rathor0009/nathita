import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: any = {
    phone:null,
    firstname: null,
    lastname: null,
    email: null,
    rephone:null,
    password: null,
    location:null,
    service:null

  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  serviceData: any;
  constructor(private authService: AuthService,private router:Router,private service:ServiceService) { }

  ngOnInit() {
this.service.services().subscribe({
  next:data=>{
    this.serviceData=data.data
    console.log(this.serviceData)
  }
})
  
  }
  onSubmit(): void {
   
    const { phone,firstname,lastname, email,rephone, password ,location,service} = this.form;
    this.authService.register(phone,firstname, lastname, email, rephone,password,location,service).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this['router'].navigate(['login'])
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
  
 
}
