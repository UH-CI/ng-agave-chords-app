import { Component, OnInit, Input } from '@angular/core';
import { Instrument } from '../_models/instrument';
import { InstrumentService } from '../_services/instrument.service';
import { Site } from '../_models/site';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})

export class InstrumentsComponent implements OnInit {
  @Input() site: Site;

  selectedInstrument: Instrument;

  instruments: Instrument[];

  constructor(private instrumentService: InstrumentService) { }

  ngOnInit() {
    if (this.site != null){
      this.instrumentService.getInstrumentsBySite(this.site)
          .subscribe(instruments => this.instruments = instruments);
    }else{
      this.instrumentService.getInstruments()
          .subscribe(instruments => this.instruments = instruments);
    }
  }

  onSelect(instrument: Instrument): void {
    this.selectedInstrument= instrument;
  }

  getInstrumentsBySite(site): void {
    this.instrumentService.getInstrumentsBySite(site)
        .subscribe(instruments => this.instruments = instruments);
  }
  getInstruments(): void {
    this.instrumentService.getInstruments()
        .subscribe(instruments => this.instruments = instruments);
  }

}
