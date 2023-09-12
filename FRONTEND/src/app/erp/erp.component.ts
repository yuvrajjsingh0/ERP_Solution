import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-erp',
  templateUrl: './erp.component.html',
  styleUrls: ['./erp.component.scss']
})
export class ErpComponent implements OnInit {

  selected: string = 'Dashboard';
  page: string = '';
  darkMode: boolean = false;
  sidebarToggle: boolean = true;
  notifying:boolean = false;
  dropdownOpen:boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ){}

  ngOnInit(){
    let selectedRoute = this.route.snapshot.firstChild?.routeConfig?.path ?? 'Dashboard';
    let routeLower = selectedRoute.substring(1);
    let routeUpper = selectedRoute.substring(0,1).toUpperCase();
    this.selected = routeUpper + routeLower;
  }

  selectFromMenu(selectedNav: string){
    if(selectedNav != ''){
      this.selected = selectedNav;
      this.router.navigate(['/erp/' + selectedNav.toLowerCase()]);
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['auth'], {replaceUrl: true});
  }

}
