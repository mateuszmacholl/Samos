import {PostService} from '../../../service/post.service';
import {first} from 'rxjs/operators';
import {Component, OnInit, Input} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {TimeConverterService} from "../../../service/time/timeConverter.service";
import {DistanceCalculatorService} from "../../../service/distance/distanceCalculator.service";
import {Coords} from "../../../model/coords";

@Component({
    selector: 'app-home-post',
    templateUrl: './home-post.component.html',
    styleUrls: ['./home-post.component.scss']
})
export class HomePostComponent implements OnInit {
    @Input() post: any;
    writtenTimeAgo: string
    distance: string

    constructor(private postService: PostService,
                private timeConverterService: TimeConverterService,
                private distanceCalculatorService: DistanceCalculatorService,
                public geoLocation: Geolocation) {
    }

    ngOnInit() {
        this.post.comments = 0

        this.writtenTimeAgo = `${this.timeConverterService
            .convertToPleasantForm(new Date(this.post.creationDate))} ago`

        this.setDistance()

        this.getNumberOfComments()
    }

    getNumberOfComments() {
        this.postService.getComments(this.post.id)
            .pipe(first())
            .subscribe(
                data => {
                    this.post.comments = data
                }
            )
    }

    getPostLocation(): Coords {
        if (this.post.coordinates == null) {
            return this.post.channel.coordinates
        } else {
            return this.post.coordinates
        }
    }

    setDistance(): Coords {
        this.geoLocation.getCurrentPosition().then(
            (res) => { // extract to separate class
                const distanceInMeters = this.distanceCalculatorService.calcInMeters
                (new Coords(res.coords.latitude, res.coords.longitude), this.getPostLocation())
                if (distanceInMeters >= 1000) {
                    this.distance = `${Math.round(distanceInMeters / 1000)} kilometers`
                } else {
                    this.distance = `${Math.round(distanceInMeters)} meters`
                }
            }).catch(
            (error) => {
                console.log('Error getting location', error)
            }
        )
        return null
    }
}
