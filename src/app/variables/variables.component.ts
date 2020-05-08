import { Component, OnInit } from '@angular/core';
import { Instrument } from '../_models/instrument';
import { InstrumentService } from '../_services/instrument.service';
import { Site } from '../_models/site';
import { SiteService } from '../_services/site.service';
import { Variable } from '../_models/variable';
import { VariableService } from '../_services/variable.service';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {

  sites: Site[];
  instruments: Instrument[];
  variables: Variable[];
  loading: false;

  constructor(private siteService: SiteService, private instrumentService: InstrumentService, private variableService: VariableService) { }

  ngOnInit() {
    this.getSites();
  }
  getSites(): void {
    this.siteService.getSites()
        .subscribe(sites => this.sites = sites);
  }
  getInstruments(site_id: string): void {
    console.log(site_id)
    var site_query = new Site()
    site_query.site_id = site_id;
    this.instrumentService.getInstrumentsBySite(site_query)
        .subscribe(instruments => this.instruments = instruments);
  }

  getVariables(instrument_uuid: string): void {
    console.log(instrument_uuid)
    var instrument_query = new Instrument()
    instrument_query.uuid = instrument_uuid;
    this.variableService.getVariables(instrument_query)
        .subscribe(variables => this.variables = variables);
  }

}
