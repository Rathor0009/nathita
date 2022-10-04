import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Photo } from '@capacitor/camera';
import { IonSearchbar } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { ServiceService } from 'src/app/services/service/service.service';
import { ShopService } from 'src/app/services/shop/shop.service';
declare  var google
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('autocomplete') autocomplete: IonSearchbar;
  registerForm!: FormGroup;
  location: [];
  form: any = {
    phone: null,
    firstname: null,
    lastname: null,
    email: null,
    rephone: null,
    password: null,
    location: null,
    service: null,
    geo_address: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  serviceData: any;
  photos: any;
  data: any;
  categoryVal: any;
  constructor(private authService: AuthService, private router: Router, private service: ServiceService,
    public photoService: PhotoService,private shop: ShopService,private fb: FormBuilder) { }

 async ngOnInit() {
    await this.photoService.loadSaved();
    // this.service.services().subscribe({
    //   next: data => {
    //     this.serviceData = data.data
    //     console.log(this.serviceData)
    //   }
    // })
    this.createForm();
  }

  createForm(){
    this.registerForm = this.fb.group({
      phone: ['',[]],
    firstname: ['',[]],
    lastname: ['',[]],
    email: ['',[]],
    rephone: ['',[]],
    password: ['',[]],
    location: ['',[]],
    service: ['',[]],
    geo_address: ['',[]]
    });
  }
// for take picture@@@@@@@@@@@@@@@@@@@@@
async addPhotoToGallery() {
  this.photoService.addNewToGallery();
  
}
  savePicture(capturedPhoto: Photo) {
    
  }

  ionViewDidEnter(){
    this.autocomplete.getInputElement().then((ref=>{
      const autocomplete= new google.maps.places.Autocomplete(ref);
      autocomplete.addListener('place_changed',()=>{
        let response = autocomplete.getPlace();
       
        console.log("respoinse----------",response.formatted_address);

 
        // this.location.coordinates.push.apply(response.geometry['location'].lat(),response.geometry['location'].lng())
        

        this.form.location = [response.geometry['location'].lat(),response.geometry['location'].lng()]
        this.form.geo_address = response.formatted_address;
    //     this.form.location = this.location;
     //console.log(this.location);
     
    //     this.form.location = this.location;
        
      })
    }))
   }

  onClick(value:any){
    console.log(value)
    this.categoryVal=value

    if(this.categoryVal == 'services'){
      return this.service.services().subscribe({
        next: data => {
          this.serviceData = data.data
          console.log(this.serviceData)
        }
      })
    }

    if(this.categoryVal == 'shops'){
      return this.shop.shops().subscribe({
        next: data => {
          this.serviceData = data.data
          console.log(this.serviceData)
        }
      })
    }

    
  }

  onSubmit(): void {
 if(this.categoryVal=='services'){

    const { phone, firstname, lastname, email, rephone, password, location, service,geo_address} = this.form;
    this.authService.register(phone, firstname, lastname, email, rephone, password, location, service,geo_address).subscribe({
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

  if(this.categoryVal=='shops'){

    const { phone, firstname, lastname, email, rephone, password, location, service ,geo_address} = this.form;
    this.authService.shopUserRegister(phone, firstname, lastname, email, rephone, password, location, service,geo_address).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this['router'].navigate(['shop-login'])
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
  }
  }



