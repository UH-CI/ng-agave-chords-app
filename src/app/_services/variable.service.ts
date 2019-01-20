import { Injectable } from '@angular/core';
import { Variable } from '../_models/variable';
//import { Variables } from './Variables';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { AppConfig } from './config.service';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VariableService {
  private VariableUrl = AppConfig.settings.apiServer.agaveChords +'/Variables';  // URL to web api

  constructor(private http: HttpClient,
    private messageService: MessageService)  {
  }

  getVariables(): Observable<Variable[]> {
    //fetch Variables from Agave Chords API
    //return this.http.get<Variable[]>(this.VariableUrl)

    let head = new HttpHeaders()
    .set("Content-Type", "application/x-www-form-urlencoded");
  //  .set('Access-Control-Allow-Origin','*');
    let options = {
      headers: head
    };

    let response = this.http.get<ResponseResults>(this.VariableUrl, options)
    .pipe(
      retry(3),
      map((data) => {
        return data.result as Variable[];
      }),
      catchError((error: any) => {
        console.log(error)
        return throwError(error.statusText);
      })
    );
    return response;
    interface ResponseResults {
      result: any
    }
  }

  createVariable(form:JSON): Observable<Variable> {
    let head = new HttpHeaders()
    .set("Content-Type", "application/x-www-form-urlencoded");
  //  .set('Access-Control-Allow-Origin','*');
    //var formData = form;
    console.log(form)
    var url = this.VariableUrl + '?name='+form['name']+'&instrument_uuid='+form['instrument_uuid']+'&shortname='+form['shortname']+'&units='+form['units']+'&units_abbrv='+form['units_abbrv']
    let options = {
      headers: head,
    };

    let response = this.http.post<ResponseResults>(url, options)
    .pipe(
      retry(3),
      map((data) => {
        return data.result as Variable;
      }),
      catchError((error: any) => {
        console.log(error)
        return throwError(error.statusText);
      })
    );
    return response;
    interface ResponseResults {
      result: any
    }
  }
}
