import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';

import { AlertController, IonSearchbar, } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth/auth.service';
import { ServiceService } from '../services/service/service.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { ShopService } from '../services/shop/shop.service';
declare var google
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('autocomplete')
  autocomplete: IonSearchbar


  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;

  @Input() 

  newMap: GoogleMap;
  canter: any = {
    lat: 30.6998327,
    lng: 76.7295102,
  }
  markerId: string;

  form: any = {
    service: '',
    location: ''

  }
  latlng:any
  search: string;
  errorMessage: any;
  serviceData: any;

  selected = 1;
  current: any;
  lat: any;

  constructor(private alertCtrl: AlertController, private auth: AuthService, private router: Router, private service: ServiceService, private shop: ShopService) { }


  async ngOnInit() {
    this.latlng
    await SplashScreen.show({
      showDuration: 10000,
      autoHide: true,
    });

    this.service.services(this.search).subscribe({
      next: data => {
        this.serviceData = data.data
        console.log(this.serviceData)

      }
    })
  }
  ngAfterViewInit() {
    this.createMap()

  }
  ionViewDidEnter() {
    // Auto completed place api

    this.autocomplete.getInputElement().then((ref => {
      const autocomplete = new google.maps.places.Autocomplete(ref);
      autocomplete.addListener('place_changed', () => {
        console.log(autocomplete.getPlace());
        let response = autocomplete.getPlace();
        this.form.location = response.formatted_address;
        this.latlng = [response.geometry['location'].lat(),response.geometry['location'].lng()];
        
      })
    }))
  }

  async createMap() {

    try {
      this.newMap = await GoogleMap.create({
        id: 'my-cool-map',
        element: this.mapRef.nativeElement,
        apiKey: environment.mapsKey,
        config: {
          center: this.canter,
          zoom: 8,
        },
      });
      await this.newMap.enableClustering();
      await this.newMap.enableCurrentLocation(true);
      await this.newMap.enableTrafficLayer(true);

      this.addMarker(this.canter.lat, this.canter.lng)
      this.addListeners()
    } catch (error) {
      console.log("hfdddddddddddddddddddddddddddddddg");

      console.log(error);

    }
  }


  async addMarker(lat: any, lng: any) {
    if (this.markerId) this.removeMarker();
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng
      },
      title: '',
      draggable: true
    })
  }
  async removeMarker(id?) {
    await this.newMap.removeMarker(id ? id : this.markerId)

  }

  async addListeners() {

    await this.newMap.setOnMarkerClickListener((event) => {
      console.log("setOnMarkerClickListener", event);
      // this.latlng=[event.latitude, event.longitude];
      // this.form.location=this.latlng
      console.log(this.latlng);



    })
    await this.newMap.setOnMapClickListener((event) => {
      // console.log('setOnMarkerClickListener', event);
      this.addMarker(event.latitude, event.longitude)
      // this.current=[event.latitude, event.longitude]
      this.latlng = [event.latitude, event.longitude];
      this.form.location = this.latlng
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",this.latlng);
 console.log(this.form.location);
 



    })
    await this.newMap.setOnMyLocationButtonClickListener((event) => {
      console.log("setOnMyLocationButtonClickListener", event);


    })
    await this.newMap.setOnMyLocationClickListener((event) => {
      console.log("setOnMyLocationClickListener", event);
      this.addMarker(event.latitude, event.longitude)
      console.log("hhhhhhhhhhh", event.latitude, event.longitude);

    })



  }
  // submit value

  onSubmit(): void {

    const { service } = this.form;
    this.auth.getservice(service,this.latlng[0],this.latlng[1]).subscribe({
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
  changeSelected(flag: any) {

    this.selected = flag;
    if (this.selected === 1) {
      this.service.services(this.search).subscribe({
        next: data => {
          this.serviceData = data.data
          console.log(this.serviceData)

        }
      })
    }
    if (this.selected === 2) {
      this.shop.shops(this.search).subscribe({
        next: data => {
          this.serviceData = data.data
          console.log(this.serviceData)

        }
      })
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
  onClick(id: any): void {
    console.log(id);

    if (this.selected === 1) {
      this.auth.getservice(id,this.latlng[0],this.latlng[1]).subscribe({
        next: data => {
         
          const params: NavigationExtras = {
            queryParams: { serviceValue: id, selected: this.selected,lat:this.latlng[0],lng:this.latlng[1]}
          }

          this.router.navigate(['service-user'], params)

        },
        error: err => {
          this.errorMessage = err.error.message;

        }
      });
    }
    if (this.selected === 2) {
      this.auth.getshop(id,this.latlng[0],this.latlng[1]).subscribe({
        next: data => {
         
          const params: NavigationExtras = {
            queryParams: { serviceValue: id, selected: this.selected,lat:this.latlng[0],lng:this.latlng[1]}
          }

          this.router.navigate(['service-user'], params)

        },
        error: err => {
          this.errorMessage = err.error.message;

        }
      });
    }
  }
  searchService() {
if(this.selected==1){
    this.service.services(this.search).subscribe({
      next: data => {
        this.serviceData = data.data
        console.log(this.serviceData)

      }
    })
  }
  if(this.selected==2){
    this.shop.shops(this.search).subscribe({
      next: data => {
        this.serviceData = data.data
        console.log(this.serviceData)

      }
    })
  }

}
  searchClick() {
    this['router'].navigate(['map'])
  }
}