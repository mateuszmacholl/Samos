import { Injectable } from '@angular/core';
import {Coords} from "../../model/coords";
import {Calculator} from "@angular-devkit/build-angular/src/angular-cli-files/utilities/bundle-calculator";

@Injectable({
    providedIn: 'root'
})
export class DistanceCalculatorService {

    constructor() {

    }

    calcInMeters(coords1: Coords, coords2: Coords) {
        const R = 6371; // Radius of the earth in km
        const dLat = this.deg2rad(coords2.latitude-coords1.latitude);
        const dLon = this.deg2rad(coords2.longitude-coords1.longitude);
        const a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(coords1.latitude)) * Math.cos(this.deg2rad(coords2.latitude)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c * 1000;
    }

    private deg2rad(deg) {
        return deg * (Math.PI/180)
    }
}