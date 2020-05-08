import { Component, OnInit } from '@angular/core';
import { Project } from '../_models/project';
import { Instrument } from '../_models/instrument';
import { ProjectService } from '../_services/project.service';
import { InstrumentService } from '../_services/instrument.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  selectedProject: Project;

  projects: Project[];
  instruments: Instrument[];

  constructor(private projectService: ProjectService, private instrumentService: InstrumentService) { }

  ngOnInit() {
    this.getProjects();
  }

  onSelect(project: Project): void {
    this.selectedProject= project;
    //this.instrumentService.getInstruments(site).subscribe(instruments => this.instruments = instruments);;
  }

  getProjects(): void {
    this.projectService.getProjects()
        .subscribe(projects => this.projects = projects);
  }

}
