import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { AlertController, IonSearchbar, } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { ServiceService } from '../services/service/service.service';
 declare  var google
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('autocomplete') autocomplete:IonSearchbar;

  form: any = {
    service: '',
    
  }
  search:string;
  errorMessage: any;
  serviceData: any;

  constructor(private alertCtrl: AlertController, private auth: AuthService, private router: Router, private service: ServiceService) { }


  ngOnInit(): void {
    this.service.services(this.search).subscribe({
      next: data => {
        this.serviceData = data.data
        console.log(this.serviceData)

      }
    })
  }
 ionViewDidEnter(){
  this.autocomplete.getInputElement().then((ref=>{
    const autocomplete= new google.maps.places.Autocomplete(ref);
    autocomplete.addListener('place_changed',()=>{
      console.log(autocomplete.getPlace());
      
    })
  }))
 }
  onSubmit(): void {
    const { service } = this.form;
    this.auth.getservice(service).subscribe({
      next: data => {
        console.log(data)
        console.log(data.service)
        const params: NavigationExtras = {
          queryParams: { serviceValue: this.form.service }
        }

        this.router.navigate(['service-user'], params)

      },
      error: err => {
        this.errorMessage = err.error.message;

      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
  onClick(id:any): void {
    console.log(id);
    
    
    this.auth.getservice(id).subscribe({
      next: data => {
        console.log(id)
        const params: NavigationExtras = {
          queryParams: { serviceValue: id }
        }

        this.router.navigate(['service-user'], params)

      },
      error: err => {
        this.errorMessage = err.error.message;

      }
    });
  }
  searchService(){
   
    this.service.services(this.search).subscribe({
      next: data => {
        this.serviceData = data.data
        console.log(this.serviceData)

      }
    })
  }
  searchClick(){
    this['router'].navigate(['map'])
  }
}