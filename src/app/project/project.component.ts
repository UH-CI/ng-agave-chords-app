import { Component, OnInit } from '@angular/core';
import { Project } from '../_models/project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private projectService: ProjectService, private formBuilder: FormBuilder) { }

  project: Project;
  projectForm: FormGroup;

  isLoadingResults = false;

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
    'project_name' : [null, Validators.required],
    'owner': [0.0, Validators.required],
    'pi' : [null, Validators.required],
    'description' : [null, Validators.required],
    'active' : [true, Validators.required]
  });
  }



  public onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    console.log('submit_form'+JSON.stringify(form))
    this.projectService.createProject(JSON.parse(JSON.stringify(form)))
        .subscribe(project => this.project = project);
    this.isLoadingResults = false;
  }

}
