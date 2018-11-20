import {Injectable} from '@angular/core';
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
        if (timeInMinutes >= 60) {
            const timeInHours = this.timeCalculatorService.calculateToHours(timeInMilliseconds)
            if (timeInHours >= 31) {
                const timeInDays = this.timeCalculatorService.calculateToDays(timeInMilliseconds)
                if (timeInDays >= 24) {
                    return date.toLocaleDateString()
                } else {
                    return `${timeInDays}d ago`
                }
            } else {
                return `${timeInHours}h ago`
            }
        } else {
            return `${timeInMinutes}min ago`;
        }
    }
}