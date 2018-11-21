import {first} from 'rxjs/operators';
import {PostService} from '../../service/post.service';
import {Component, OnInit} from "@angular/core";
import {GeolocationService} from "../../service/geolocation.service";


@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
    posts: any[]

    constructor(private postService: PostService,
                private geolocationService: GeolocationService) {

    }

    ngOnInit() {
        this.getPosts()
    }

    getPosts() {
        this.geolocationService.getCurrentLocation().then(
            (loc) => {
                this.postService.getPostsByLocationByNewest(loc, 1500)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.posts = data
                        }
                    )
            },
        (error) => {
                console.log(error)
        }
        )
    }
}
