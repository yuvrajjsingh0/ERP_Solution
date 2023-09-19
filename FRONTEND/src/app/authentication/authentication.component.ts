import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  userEmail: string = '';
  userPassword: string = '';

  constructor(
    private router: Router,
    private authService: AuthService){
      if(this.authService.getAuthStatus()) this.router.navigate(['erp'], { replaceUrl: true });
  }

  signIn(){
    console.log("Logging in", this.userEmail, this.userPassword);

    this.authService.login(this.userEmail, this.userPassword).then((res) => {
      this.router.navigate(['erp'], { replaceUrl: true });
    }).catch(err => {
      console.log(err);
      alert("Check your credentials")
    })
    
  }
}
