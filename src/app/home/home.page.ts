import { first } from 'rxjs/operators';
import { PostService } from './../../service/post.service';
import { Component, OnInit } from "@angular/core";


@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  posts: any[]

  constructor(private postService: PostService) {

  }

  ngOnInit() {
    this.getAllPosts()
  }

  getAllPosts(){
    this.postService.getNewest()
    .pipe(first())
    .subscribe(
      data => {
        this.posts = data
      }
    )
  }
}
