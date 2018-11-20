import {Injectable} from '@angular/core';
import {GeolocationService} from "../geolocation.service";
import {DistanceCalculatorService} from "./distanceCalculator.service";
import {Coords} from "../../model/coords";

@Injectable({
    providedIn: 'root'
})
export class DistanceConverterService {

    constructor(private geolocationService: GeolocationService,
                private distanceCalculatorService: DistanceCalculatorService) {

    }

    convertToPleasantForm(location: Coords): Promise<String> {
        return new Promise((resolve, reject) => this.geolocationService.getCurrentLocation().then(
            (currentLocation) => {
                const distanceInMeters = this.distanceCalculatorService.calcInMeters(currentLocation, location)
                if (distanceInMeters >= 1000) {
                    resolve(`${Math.round(distanceInMeters / 1000)}km`)
                } else {
                    resolve(`${Math.round(distanceInMeters)}m`)
                }
            }).catch(
            (error) => {
                reject(console.log(error))
            }
        ))
    }
}