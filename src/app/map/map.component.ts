import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import {Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { User } from '../_models/metadata'
import {Metadata } from '../_models/metadata'
import { Instrument } from '../_models/instrument'
import {latLng, LatLng, tileLayer,circle,polygon,icon} from 'leaflet';
import * as L from 'leaflet';



import { AppConfig } from '../_services/config.service';
//import { AuthenticationService } from '../_services/authentication.service';
import { SpatialService } from '../_services/spatial.service'
import { InstrumentService } from '../_services/instrument.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  metadata: Metadata[];
  instruments: Instrument[]
  selectedMetadata: Metadata;
  currentUser: User;
  constructor(private http: HttpClient, private spatial: SpatialService,private instrumentService: InstrumentService) {
    //currentUser: localStorage.getItem('currentUser')
  }

  ngOnInit() {
    //this.instrumentService.getInstruments().subscribe(instruments => this.instruments = instruments);
    this.instrumentService.getInstruments().subscribe(data => {
               console.log('data', data);
               this.instruments = data;
            })
    console.log("getinstruments")
  }

  public onDrawCreated(e: any) {

		// tslint:disable-next-line:no-console

    console.log('Draw Created Event!');
    console.log(e)
    console.log(String(e.layer.toGeoJSON()))
    var result = this.spatial.spatialSearch(e.layer.toGeoJSON().geometry).subscribe(metadata => this.metadata = metadata);
	}

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(21.289373, -157.917480)
  };

  drawOptions = {
    position: 'topright',
    draw: {
      circle: false,
      polyline: false,
      circlemarker: false,
      marker: false,
    },
    edit: {
             
             edit: false
         }
 };


}
