import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  returnUrl: string
  error: string
  form = { username: '', password: '' }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.logout()
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  login() {
    this.authenticationService.login(this.form.username, this.form.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl])
        },
        error => {
          this.error = error
        });
  }

  register(){
    this.router.navigateByUrl('/registration');
  }
}

