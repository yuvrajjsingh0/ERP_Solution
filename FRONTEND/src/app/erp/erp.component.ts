import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-erp',
  templateUrl: './erp.component.html',
  styleUrls: ['./erp.component.scss']
})
export class ErpComponent {

  selected: string = 'Dashboard';
  page: string = '';
  darkMode: boolean = false;
  sidebarToggle: boolean = true;
  notifying:boolean = false;
  dropdownOpen:boolean = false;

  constructor(private router: Router){}

  selectFromMenu(selectedNav: string){
    if(selectedNav != ''){
      this.selected = selectedNav;
      this.router.navigate(['/erp/' + selectedNav.toLowerCase()]);
    }
  }

}
