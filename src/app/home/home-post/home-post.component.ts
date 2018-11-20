import {PostService} from '../../../service/post.service';
import {first} from 'rxjs/operators';
import {Component, OnInit, Input} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {TimeConverterService} from "../../../service/time/timeConverter.service";
import {DistanceCalculatorService} from "../../../service/distance/distanceCalculator.service";
import {Coords} from "../../../model/coords";
import {DistanceConverterService} from "../../../service/distance/distanceConverter.service";

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
                private distanceConverterService: DistanceConverterService) {
    }

    ngOnInit() {
        this.post.comments = 0

        this.setWrittenTimeAgo()
        this.setDistance()
        this.setComments()
    }

    setWrittenTimeAgo(){
        this.writtenTimeAgo = this.timeConverterService
            .convertToPleasantForm(new Date(this.post.creationDate))
    }

    setComments() {
        this.postService.getComments(this.post.id)
            .pipe(first())
            .subscribe(
                data => {
                    this.post.comments = data
                }
            )
    }

    setDistance() {
        const postLocation = this.getPostLocation()
        this.distanceConverterService.convertToPleasantForm(postLocation).then(
            (loc) => {
                this.distance = loc.valueOf()
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
}
