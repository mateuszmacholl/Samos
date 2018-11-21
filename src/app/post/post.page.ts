import {Component, OnInit} from '@angular/core';
import {CommentService} from "../../service/comment.service";
import {first} from "rxjs/operators";
import {PostService} from "../../service/post.service";
import {DistanceConverterService} from "../../service/distance/distanceConverter.service";
import {TimeConverterService} from "../../service/time/timeConverter.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-post',
    templateUrl: './post.page.html',
    styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
    id: number
    post: any
    writtenTimeAgo: string
    distance: string

    constructor(private commentService: CommentService,
                private postService: PostService,
                private timeConverterService: TimeConverterService,
                private distanceConverterService: DistanceConverterService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.setId()
        this.setPost()
        this.setComments()
    }

    setId(){
        this.id = Number(this.route.snapshot.paramMap.get('id'))
    }

    setPost(){
        this.postService.getPost(this.id)
            .pipe(first())
            .subscribe(
                data => {
                    this.post = data
                    this.setWrittenTimeAgo()
                    this.setDistance()
                }
            )
    }

    setWrittenTimeAgo() {
        this.writtenTimeAgo = this.timeConverterService
            .convertToPleasantForm(new Date(this.post.creationDate))
    }

    setDistance() {
        const postLocation = this.postService.getPostLocation(this.post)
        this.distanceConverterService.convertToPleasantForm(postLocation).then(
            (loc) => {
                this.distance = loc.valueOf()
            }
        )
    }

    setComments() {
        this.commentService.getComments()
            .pipe(first())
            .subscribe(
                data => {
                    this.post.comments = data
                }
            )
    }
}
