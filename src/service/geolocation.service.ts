import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {Coords} from "../model/coords";
import {DistanceCalculatorService} from "./distance/distanceCalculator.service";

@Injectable({providedIn: 'root'})
export class GeolocationService {

    constructor(public geoLocation: Geolocation) {
    }

    getCurrentLocation(): Promise<Coords> {
        return new Promise((resolve, reject) => {
            this.geoLocation.getCurrentPosition().then(
                (res) => {
                    resolve(new Coords(res.coords.latitude, res.coords.longitude))
                }).catch(
                (error) => {
                    reject(console.log('Error getting location', error))
                }
            )
        })
    }

}