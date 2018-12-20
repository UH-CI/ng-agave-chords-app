import { Injectable } from '@angular/core';
import { Site } from '../_models/site';
//import { Sites } from './sites';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { AppConfig } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private siteUrl = AppConfig.settings.apiServer.agaveChords +'/sites';  // URL to web api

  constructor(private http: HttpClient,
    private messageService: MessageService)  {
  }

  getSites(): Observable<Site[]> {
    //fetch Sites from Agave Chords API
    //return this.http.get<Site[]>(this.siteUrl)

    let head = new HttpHeaders()
    .set("Content-Type", "application/x-www-form-urlencoded");
  //  .set('Access-Control-Allow-Origin','*');
    let options = {
      headers: head
    };

    let response = this.http.get<ResponseResults>(this.siteUrl, options)
    .pipe(
      retry(3),
      map((data) => {
        return data.result as Site[];
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
