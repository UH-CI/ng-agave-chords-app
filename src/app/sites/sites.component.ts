import { Component, OnInit } from '@angular/core';
import { Site } from '../_models/site';
import { Instrument } from '../_models/instrument';
import { SiteService } from '../_services/site.service';
import { InstrumentService } from '../_services/instrument.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  selectedSite: Site;

  sites: Site[];
  instruments: Instrument[];

  constructor(private siteService: SiteService, private instrumentService: InstrumentService) { }

  ngOnInit() {
    this.getSites();
  }

  onSelect(site: Site): void {
    this.selectedSite= site;
    //this.instrumentService.getInstruments(site).subscribe(instruments => this.instruments = instruments);;
  }

  getSites(): void {
    this.siteService.getSites()
        .subscribe(sites => this.sites = sites);
  }

}
