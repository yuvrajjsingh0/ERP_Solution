import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from './services/util/session-storage.service';

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
    this.sessStorage.clear();
  }


}
