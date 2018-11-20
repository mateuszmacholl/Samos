import { Injectable } from '@angular/core';
import {TimeCalculatorService} from "./timeCalculator.service";

@Injectable({
    providedIn: 'root'
})
export class TimeConverterService {

    constructor(private timeCalculatorService: TimeCalculatorService) {

    }

    convertToPleasantForm(date: Date): string {
        const timeInMilliseconds = this.timeCalculatorService.subtract(date, new Date())
        const timeInMinutes = this.timeCalculatorService.calculateToMinutes(timeInMilliseconds)
        if(timeInMinutes >= 60){
            const timeInHours = this.timeCalculatorService.calculateToHours(timeInMilliseconds)
            if(timeInHours >= 31){
                if(timeInHours >= 24){
                    const timeInDays = this.timeCalculatorService.calculateToDays(timeInMilliseconds)
                    return `${timeInDays} days`
                } else {
                    return date.toLocaleDateString()
                }
            } else {
                return `${timeInHours} hours`
            }
        } else {
            return `${timeInMinutes} minutes`;
        }
    }
}