import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { LatLng } from '@capacitor-community/capacitor-googlemaps-native/dist/esm/types/common/latlng.interface';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { AlertController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from '../services/auth/auth.service';
import { ServiceService } from '../services/service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;

  form: any = {
    service: ''
  }
  errorMessage: any;
  serviceData: any;

  constructor(private alertCtrl: AlertController, private auth: AuthService, private router: Router, private service: ServiceService) { }
  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-app',
      apiKey: 'environment.mapsKey',
      element: this.mapRef.nativeElement,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9
        },
        zoom: 9
      },
    })
    this.addMarkers()
  }
  async addMarkers() {
    const markers: Marker[] = [
      {
        coordinate: {
          lat: 33.7,
          lng: -177.8,

        },
        title: 'localhost',
        snippet: 'Best place on the Earth'


      },
      {
        coordinate: {
          lat: 33.7,
          lng: -177.2,

        },
        title: 'randam place',
        snippet: 'Not sure'
      }]
    const result=await this.map.addMarkers(markers)

    this.map.setOnMarkerClickListener(async (marker) => {
      console.log(marker)
      const modal =await this.alertCtrl.create({
        component:ModalPage,
        componentProps:{
          marker,
        },
        breakpoints:[0,0.3],
        initialBreakpoint:0.3
      })
      modal.present()
    })
  }
  ngOnInit(): void {
    this.service.services().subscribe({
      next: data => {
        this.serviceData = data.data
        console.log(this.serviceData)

      }
    })
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

        this.router.navigate(['/service-user'], params)
      },
      error: err => {
        this.errorMessage = err.error.message;

      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
  //   ionViewDidEnter() {
  //     this.createMap();
  //   }

  //  async createMap() {
  //     const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;

  //   await  CapacitorGoogleMaps.create({
  //       width: Math.round(boundingRect.width),
  //       height: Math.round(boundingRect.height),
  //       x: Math.round(boundingRect.x),
  //       y: Math.round(boundingRect.y),
  //       zoom: 5
  //     });

  //     CapacitorGoogleMaps.addListener('onMapReady', async () => {
  //       await CapacitorGoogleMaps.setMapType({
  //         type: "normal" // hybrid, satellite, terrain
  //       });

  //       this.showCurrentPosition(); 

  //       CapacitorGoogleMaps.addListener('didTapPOIWithPlaceID', async (ev) => {
  //         const result = ev.results;

  //         const alert = await this.alertCtrl.create({
  //           header: result.name,
  //           message: `Place ID:  ${result.placeID}`,
  //           buttons: ['OK']
  //         });

  //         await alert.present();
  //       });

  //     });
  //   }

  //   async showCurrentPosition() {
  //     Geolocation.requestPermissions().then(async premission => {
  //       const coordinates = await Geolocation.getCurrentPosition();
  // console.log(Geolocation)
  //       // Create our current location marker
  //       CapacitorGoogleMaps.addMarker({
  //         latitude: coordinates.coords.latitude,
  //         longitude: coordinates.coords.longitude,
  //         title: 'My castle of loneliness',
  //         snippet: 'Come and find me!'
  //       });

  //       // Focus the camera
  //       CapacitorGoogleMaps.setCamera({
  //         latitude: coordinates.coords.latitude,
  //         longitude: coordinates.coords.longitude,
  //         zoom: 12,
  //         bearing: 0
  //       });
  //     });
  //   }

  //   ionViewDidLeave() {
  //     CapacitorGoogleMaps.close();
  //   }

  //   draw() {
  //     const points: LatLng[] = [
  //       {
  //         latitude: 51.88,
  //         longitude: 7.60,
  //       },
  //       {
  //         latitude: 55,
  //         longitude: 10,
  //       }
  //     ];

  //     CapacitorGoogleMaps.addPolyline({
  //       points,
  //       color: '#ff00ff',
  //       width: 2
  //     });
  //   }

}