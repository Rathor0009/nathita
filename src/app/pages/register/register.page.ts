import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from '@capacitor/camera';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: any = {
    phone: null,
    firstname: null,
    lastname: null,
    email: null,
    rephone: null,
    password: null,
    location: null,
    service: null

  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  serviceData: any;
  photos: any;
  data:any
  constructor(private authService: AuthService, private router: Router, private service: ServiceService, public photoService: PhotoService) { }

 async ngOnInit() {
    await this.photoService.loadSaved();
    this.service.services().subscribe({
      next: data => {
        this.serviceData = data.data
        console.log(this.serviceData)
      }
    })
  }
// for take picture@@@@@@@@@@@@@@@@@@@@@
async addPhotoToGallery() {
  this.photoService.addNewToGallery();
  
}
  savePicture(capturedPhoto: Photo) {
    
  }


  onSubmit(): void {

    const { phone, firstname, lastname, email, rephone, password, location, service } = this.form;
    this.authService.register(phone, firstname, lastname, email, rephone, password, location, service).subscribe({
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
