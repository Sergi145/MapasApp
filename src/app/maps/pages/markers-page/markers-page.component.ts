import {Component, ElementRef, ViewChild} from '@angular/core';
import mapboxgl, {LngLat, Map, Marker} from "mapbox-gl";

interface MarkerColor {
  color:string;
  marker: Marker

}

interface PlainMarker {
  color: string;
  lngLat: number[];
}


@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {
  @ViewChild('map') divMap?:ElementRef;

  public markers:MarkerColor[]=[];
  public map?:Map;
  public currentCenter:LngLat = new LngLat(-74.65419744334322,40);

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
      zoom: 14
    });
    this.readFromLocalStorage();

    const markerHtml = document.createElement('div');
    markerHtml.innerHTML= 'fernanddo herrera'

    const marker= new Marker({color: 'orange'}).setLngLat(this.currentCenter)
      .addTo(this.map);

  }

  createMarker() {
    if (!this.map) throw new Error('no existe mapa');

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lgnLat= this.map.getCenter();
    this.addMarker(lgnLat,color);
  }

  addMarker(lngLat:LngLat, color:string) {
    if (!this.map) throw new Error('no existe mapa');

    const marker = new Marker({
      color:color,
      draggable: true

    }).setLngLat(lngLat)
      .addTo(this.map);
    this.markers.push({
      color:color,marker:marker
    });
    this.saveToLocalStorage();

    marker.on('dragend', ()=> {
      this.saveToLocalStorage();
    })
  }

  deleteMarker(index:number) {
    this.markers[index].marker.remove();
    this.markers.splice(index,1);

  }

  flyto(marker:Marker) {
    this.map?.flyTo({
      zoom:14,
      center:marker.getLngLat()
    })

  }

  saveToLocalStorage(){
    const plainMarkers:PlainMarker[] = this.markers.map(({color,marker})=>{
        return {
          color,
          lngLat: marker.getLngLat().toArray()
        }
    });

    console.log(plainMarkers);
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage () {
    const plainMakersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers:PlainMarker[] = JSON.parse(plainMakersString);
    console.log(plainMarkers);


    plainMarkers.forEach(({ color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color);
    })
  }

}
