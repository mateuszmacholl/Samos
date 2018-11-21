import {PostService} from '../../../service/post.service';
import {first} from 'rxjs/operators';
import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {TimeConverterService} from "../../../service/time/timeConverter.service";
import {Coords} from "../../../model/coords";
import {DistanceConverterService} from "../../../service/distance/distanceConverter.service";

@Component({
    selector: 'app-home-post',
    templateUrl: './home-post.component.html',
    styleUrls: ['./home-post.component.scss']
})
export class HomePostComponent implements OnInit {
    @Input() post: any
    writtenTimeAgo: string
    distance: string

    constructor(
        private router: Router,
        private postService: PostService,
        private timeConverterService: TimeConverterService,
        private distanceConverterService: DistanceConverterService) {
    }

    ngOnInit() {
        this.post.comments = 0

        this.setWrittenTimeAgo()
        this.setDistance()
        this.setComments()
    }

    setWrittenTimeAgo() {
        this.writtenTimeAgo = this.timeConverterService
            .convertToPleasantForm(new Date(this.post.creationDate))
    }

    setComments() {
        this.postService.getComment(this.post.id)
            .pipe(first())
            .subscribe(
                data => {
                    this.post.comments = data
                }
            )
    }

    setDistance() {
        const postLocation = this.postService.getPostLocation(this.post)
        this.distanceConverterService.convertToPleasantForm(postLocation).then(
            (loc) => {
                this.distance = loc.valueOf()
            }
        )
    }

    showPost() {
        this.router.navigate(['/post', this.post.id])
    }
}
