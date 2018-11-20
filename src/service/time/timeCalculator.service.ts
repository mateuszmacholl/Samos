import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TimeCalculatorService {

    constructor() {

    }

    subtract(earlierDate: Date, laterDate: Date): number {
        return Math.abs(earlierDate.getTime() - laterDate.getTime());
    }

    calculateToMinutes(value: number): number {
        return Math.round(value / 60000)
    }

    calculateToHours(value: number): number {
        const dateInMinutes = this.calculateToMinutes(value)
        return Math.round(dateInMinutes / 60)
    }

    calculateToDays(value: number): number {
        const dateInMinutes = this.calculateToMinutes(value)
        return Math.round(dateInMinutes / 24)
    }
}
