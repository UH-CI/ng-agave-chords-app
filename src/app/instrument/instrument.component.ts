import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import {Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import {latLng, LatLng, tileLayer,circle,polygon,icon} from 'leaflet';
import * as L from 'leaflet';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Instrument } from '../_models/instrument';
import { InstrumentService } from '../_services/instrument.service';
import { Site } from '../_models/site';
import { SiteService } from '../_services/site.service';

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.css']
})
export class InstrumentComponent implements OnInit {

  sites: Site[];

  constructor(private siteService: SiteService, private instrumentService: InstrumentService) { }

  ngOnInit() {
    this.getSites();
  }

  getSites(): void {
    this.siteService.getSites()
        .subscribe(sites => this.sites = sites);
  }
}
