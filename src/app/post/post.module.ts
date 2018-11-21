import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PostPage} from './post.page';
import {CommentComponent} from "./comment/comment.component";

const routes: Routes = [
    {
        path: '',
        component: PostPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [PostPage, CommentComponent],
    exports: [CommentComponent]
})
export class PostPageModule {
}
