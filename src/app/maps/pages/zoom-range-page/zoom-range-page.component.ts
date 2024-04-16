import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import mapboxgl, {LngLat} from "mapbox-gl";
import {Map} from "mapbox-gl";

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements  AfterViewInit,OnDestroy {
  @ViewChild('map') divMap?:ElementRef;

  public zoom:number = 10;
  public map?:Map;
  public currentCenter:LngLat = new LngLat(-74.5,40);

  ngOnDestroy():void {
       this.map?.remove();
  }

  ngAfterViewInit():void {

    if (!this.divMap) throw new Error('El elemento html no fue encontrado');

    console.log(this.divMap);

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListener();

  }

  mapListener() {
    if(!this.map) throw new Error('Mapa no inicializado');

    this.map.on('zoom',(ev)=> {
      this.zoom= this.map!.getZoom();

    })

    this.map.on('zoomend',(ev)=> {

      if(this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
      const {lng,lat} = this.currentCenter;


    })

    this.map.on ('move',()=> {
        this.currentCenter= this.map!.getCenter();
        console.log(this.currentCenter);
    })
  }

  zoomIn() {
      this.map?.zoomIn();
  }

  zoomOut() {
      this.map?.zoomOut();
  }

  zoomChanged(value:string){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }
}
