import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ClientsService } from '../services/clients.service';
import { PaymentsService } from '../services/payments.service';

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

  searchStr: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private clientsService: ClientsService,
    private paymentsService: PaymentsService
  ){}

  ngOnInit(){
    this.searchStr = '';
    let selectedRoute = this.route.snapshot.firstChild?.routeConfig?.path ?? 'Dashboard';
    let routeLower = selectedRoute.substring(1);
    let routeUpper = selectedRoute.substring(0,1).toUpperCase();
    this.selected = routeUpper + routeLower;
  }

  selectFromMenu(selectedNav: string){
    if(selectedNav != ''){
      this.searchStr = '';
      this.clientsService.cancelSearch();
      this.paymentsService.cancelSearch();
      this.selected = selectedNav;
      this.router.navigate(['/erp/' + selectedNav.toLowerCase()]);
    }
  }

  performSearch($event:any){
    if(this.searchStr.length > 2){
      console.log("Change");
      switch(this.selected){
        case 'Clients':
          this.clientsService.search(this.searchStr);
          break;
        case 'Payments':
          this.paymentsService.search(this.searchStr);
          break;
      }
    }else{
      switch(this.selected){
        case 'Clients':
          this.clientsService.cancelSearch();
          break;
        case 'Payments':
          this.paymentsService.cancelSearch();
          break;
      }
    }
  }



  logout(){
    this.authService.logout();
    this.router.navigate(['auth'], {replaceUrl: true});
  }

}
