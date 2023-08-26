import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  userEmail: string = '';
  userPassword: string = '';

  constructor(private router: Router){

  }

  signIn(){
    console.log("Logging in", this.userEmail, this.userPassword);
    this.router.navigate(['erp']);
  }
}
