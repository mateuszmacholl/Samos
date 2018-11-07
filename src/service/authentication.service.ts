import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  confirmAccountUrl: string = "http://samos.pl/confirm-account"

  constructor(private http: HttpClient) {
  }

  static getLoggedInUser() {
    const decodedToken = jwt_decode(localStorage.getItem('authorization')) as any;
    return decodedToken.sub;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, {username, password}, {observe: 'response'})
      .pipe(map(res => {
        const auth = res.headers.get('Authorization');
        if (res && auth) {
          localStorage.setItem('authorization', auth.valueOf());
        }
        return auth;
      }));
  }

  logout() {
    localStorage.removeItem('authorization');
  }

  register(email: string, username: string, password: string){
    const url = this.confirmAccountUrl
    return this.http.post<any>(`${environment.apiUrl}/users`, {email, username, password, url}, {observe: 'response'})
    .pipe(map(res => {
      return res.body
    }));
  }
}
