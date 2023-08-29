import { Component, OnInit } from '@angular/core';
import Client from 'src/app/models/Client';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  isEditing: boolean = false;
  name: string = "";
  phone_num: string = "";
  email: string = "";
  package: number = 0;

  isAdding:boolean = false;

  clients: Array<Client> = [];

  constructor(private clientsService: ClientsService){}

  ngOnInit(){
    this.clientsService.getClients().then((res) => {
      console.log(res);
      this.clients = res;
    }).catch(err => {
      console.log(err);
    });
  }

  addNewClient(){
    this.clientsService.putClient({
      name: this.name,
      phone_num: this.phone_num,
      email: this.email,
      package_id: this.package
    }).then((res) => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

}
