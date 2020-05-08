import { Component, OnInit } from '@angular/core';
import { Instrument } from '../_models/instrument';
import { InstrumentService } from '../_services/instrument.service';
import { Site } from '../_models/site';
import { SiteService } from '../_services/site.service';
import { Variable } from '../_models/variable';
import { VariableService } from '../_services/variable.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.css']
})
export class VariableComponent implements OnInit {

  sites: Site[];
  instruments: Instrument[];
  variable: Variable;
  variableForm: FormGroup;
  name:string='';
  instrument_uuid: string;
  shortname:string='';
  units:string='';
  units_abbrv:string='';

  constructor(private siteService: SiteService, private instrumentService: InstrumentService, private variableService: VariableService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getSites();
    this.variableForm = this.formBuilder.group({
    'instrument_uuid' : [null, Validators.required],
    'name': [null, Validators.required],
    'shortname': [null, Validators.required],
    'units': [null, Validators.required],
    'units_abbrv': [null, Validators.required],
  });
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

  public onFormSubmit(form:NgForm) {
    console.log('submit_form'+JSON.stringify(form))
    this.variableService.createVariable(JSON.parse(JSON.stringify(form)))
        .subscribe(variable => this.variable = variable);

  }
}
