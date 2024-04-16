import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import mapboxgl, {Marker} from "mapbox-gl";

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{
    @Input() lngLat?:[number,number];
  @ViewChild('map') divMap?:ElementRef;

    ngAfterViewInit() {
      if(!this.divMap?.nativeElement) throw new Error('Map div no encontrado')
      if(!this.lngLat) throw new Error('no a venido el lnglat')

      const map = new mapboxgl.Map({
        container: this.divMap.nativeElement, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.lngLat, // starting position [lng, lat]
        zoom: 9, // starting zoom
        interactive:false
      });
      new Marker()
        .setLngLat(this.lngLat)
        .addTo(map);
    }

}
