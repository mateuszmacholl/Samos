import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  returnUrl: string

  constructor(private router: Router,
     private authenticationService: AuthenticationService,
     private route: ActivatedRoute
     ) { }

  ngOnInit() {
    this.authenticationService.logout()
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  login(){
    this.router.navigateByUrl('/login');
  }

}
