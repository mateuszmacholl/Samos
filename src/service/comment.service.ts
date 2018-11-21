import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable({providedIn: 'root'})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getComments(){
    return this.http.get<any>(`${environment.apiUrl}/answers`, {observe: 'response'})
    .pipe(map(res => {
      return res.body.content
    }));
  }

}