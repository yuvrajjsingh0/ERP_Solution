import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from './services/util/session-storage.service';
import { Carousel, Dropdown, initTE , Datepicker, Input} from 'tw-elements';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'FRONTEND';

  constructor(private sessStorage: SessionStorageService){

  }
  
  ngOnInit(): void {
    //initTE({ Carousel, Dropdown, Datepicker, Input });
    this.sessStorage.clear();
  }


}
