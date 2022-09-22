import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
const { Geolocation } = Plugins;
import { Plugins } from '@capacitor/core';
declare var google;
const apiKey = 'YOUR_API_KEY_HERE';

const mapRef = document.getElementById('map');
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  canter: any = {
    lat: 30.6998327,
    lng: 76.7295102,
  }
  markerId: string;

  
  constructor(
    public platform: Platform) {
  }
 
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.createMap()
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
      this.addMarker(this.canter.lat, this.canter.lng)
      this.addListeners()
    } catch (error) {
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
      title:'',
      draggable: true
    })
  }
  async removeMarker(id?) {
    await this.newMap.removeMarker(id ? id : this.markerId)
  }

  async addListeners() {

    await this.newMap.setOnMarkerClickListener((event) => {
      console.log(event);

    })
    await this.newMap.setOnMapClickListener((event) => {
      console.log(event);
      this.addMarker(event.latitude, event.longitude)

    })
    await this.newMap.setOnMyLocationButtonClickListener((event) => {
      console.log(event);
      // this.addMarker(event.latitude,event.longitude)

    })
    await this.newMap.setOnMyLocationClickListener((event) => {
      console.log(event);
      this.addMarker(event.latitude, event.longitude)

    })



  }


  ////Auto Completed

  

}
