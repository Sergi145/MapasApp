import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports:[CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

    public menuItems:MenuItem[]= [
      { route:'/maps/fullscreen', name: 'FullScreen'},
      { route:'/maps/zoom-range', name: 'Zoom-Range'},
      { route:'/maps/markers', name: 'Markers'},
      { route:'/alone', name: 'Alone page'},
      { route:'/maps/properties', name: 'Houses'},
    ]
}
