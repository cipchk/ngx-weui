import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AqmPanoramaComponent } from 'angular-qq-maps';

@Component({
  selector: 'example-map-qq',
  templateUrl: './map-qq.component.html',
  styleUrls: ['./map-qq.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoMapQQComponent {
  options: any = {
    pano: '10011501120802180635300',
    pov: {
      heading: 1,
      pitch: 0,
    },
    zoom: 1,
  };
  @ViewChild('map') map: AqmPanoramaComponent;
}
