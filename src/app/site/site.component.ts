import { Component, OnInit } from '@angular/core';
import { Site } from '../_models/site';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import {Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import {latLng, LatLng, tileLayer,circle,polygon,icon} from 'leaflet';
import * as L from 'leaflet';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SiteService } from '../_services/site.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  constructor(private siteService: SiteService, private formBuilder: FormBuilder) { }

  site: Site;
  siteForm: FormGroup;
  name:string='';
  elevation:number;
  geojson:string='';
  isLoadingResults = false;

  ngOnInit() {
    this.siteForm = this.formBuilder.group({
    'name' : [null, Validators.required],
    'elevation': [0.0, Validators.required],
    'geojson' : [null, Validators.required],
    'updated_at' : [null, Validators.required]
  });
  }

  public onDrawCreated(e: any) {

		// tslint:disable-next-line:no-console

    console.log('Draw Created Event!');
    console.log(e)
    console.log(String(e.layer.toGeoJSON()))
    this.siteForm.patchValue({'geojson' : JSON.stringify(e.layer.toGeoJSON().geometry)})
  //  var result = this.spatial.spatialSearch(e.layer.toGeoJSON().geometry).subscribe(metadata => this.metadata = metadata);
	}

  public onDrawEdited(e: any) {

		// tslint:disable-next-line:no-console

    console.log('Draw Created Event!');
    console.log(e)
    console.log(String(e.layers.toGeoJSON()))
    this.siteForm.patchValue({'geojson' : JSON.stringify(e.layer.toGeoJSON().geometry)})
  //  var result = this.spatial.spatialSearch(e.layer.toGeoJSON().geometry).subscribe(metadata => this.metadata = metadata);
	}

  public onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    console.log('submit_form'+JSON.stringify(form))
    this.siteService.createSite(JSON.parse(JSON.stringify(form)))
        .subscribe(site => this.site = site);
    this.isLoadingResults = false;
    // this.api.addProduct(form)
    //   .subscribe(res => {
    //       let id = res['_id'];
    //       this.isLoadingResults = false;
    //       this.router.navigate(['/product-details', id]);
    //     }, (err) => {
    //       console.log(err);
    //       this.isLoadingResults = false;
    //     });
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
      polygon: false,/*{
          metric: false,
          showArea: true,
          drawError: {
            color: '#b00b00',
            timeout: 1000
          },
          shapeOptions: {
            color: 'blue'
          }
        },*/
      rectangle: false,
       marker: {
          icon: L.icon({
              iconSize: [ 25, 41 ],
              iconAnchor: [ 13, 41 ],
              iconUrl: 'assets/marker-icon.png',
              shadowUrl: 'assets/marker-shadow.png'
          })
       },


    }
 };
}
