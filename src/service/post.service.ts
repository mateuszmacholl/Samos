import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {Coords} from "../model/coords";
import {GeolocationService} from "./geolocation.service";

@Injectable({providedIn: 'root'})
export class PostService {

    constructor(private http: HttpClient) {
    }

    getPostsByLocationByNewest(loc: Coords, range: number) {
        const lat = loc.latitude
        const long = loc.longitude
        return this.http.get<any>(`${environment.apiUrl}/posts/near-area?latitude=${lat}&longitude=${long}&range=${range}`,
            {observe: 'response'})
            .pipe(map(res => {
                return res.body
            }))
    }

    getComment(postId: Number) {
        return this.http.get<any>(`${environment.apiUrl}/posts/${postId}/answers`, {observe: 'response'})
            .pipe(map(res => {
                return res.body
            }));
    }

    getPost(postId: number) {
        return this.http.get<any>(`${environment.apiUrl}/posts/${postId}`, {observe: 'response'})
            .pipe(map(res => {
                return res.body
            }));
    }

    getPostLocation(post: any): Coords {
        if (post.coordinates == null) {
            return post.channel.coordinates
        } else {
            return post.coordinates
        }
    }

}