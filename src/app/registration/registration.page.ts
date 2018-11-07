import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../service/authentication.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  returnUrl: string
  error: string
  form = { email: '', username: '', password: '', confirmPassword: '' }
  success = false


  constructor(
    private router: Router,
     private authenticationService: AuthenticationService,
     private route: ActivatedRoute){
     }

  ngOnInit() {
    this.authenticationService.logout()
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  register(){
    if(!this.correctPasswords()){
      return
    }
    this.authenticationService.register(this.form.email,this.form.username, this.form.password)
    .pipe(first())
    .subscribe(
      data => {
        this.success = true
      },
      error => {
        this.error = error
      });
  }

  correctPasswords(){
    if(this.form.confirmPassword != this.form.password){
      this.error = "Passwords are different"
      return false
    }
    return true
  }

  goToLogin(){
    this.router.navigateByUrl('/login');
    this.resetData()
  }

  resetData(){
    this.success = false
    this.error = ''
  }

}
