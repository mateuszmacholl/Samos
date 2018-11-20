import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable({providedIn: 'root'})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getNewest(){
    return this.http.get<any>(`${environment.apiUrl}/posts?sort=creationDate,desc`, {observe: 'response'})
    .pipe(map(res => {
      return res.body.content
    }));
  }

  getComments(postId: Number){
    return this.http.get<any>(`${environment.apiUrl}/posts/${postId}/answers`, {observe: 'response'})
    .pipe(map(res => {
      return res.body
    }));
  }

}