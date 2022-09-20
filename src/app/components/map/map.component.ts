import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;

  constructor() { }
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
        zoom: 50
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
      // const modal =await this.alertCtrl.create({
      //   component:ModalPage,
      //   componentProps:{
      //     marker,
      //   },
      //   breakpoints:[0,0.3],
      //   initialBreakpoint:0.3
      // })
      // modal.present()
    })
  }

  ngOnInit() {}

}
