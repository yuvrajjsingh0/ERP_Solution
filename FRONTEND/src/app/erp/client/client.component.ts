import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Client from 'src/app/models/Client';
import Package from 'src/app/models/Package';
import Payment from 'src/app/models/Payment';
import { ClientsService } from 'src/app/services/clients.service';
import { PackagesService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private packageService: PackagesService){}

  payments: Array<Payment> = [];
  client: Client | undefined;
  package: Package | undefined;

  deletingRes = -1

  delete(event: string){

  }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      console.log(params);
  
      if (params['clientId']) { 
        console.log(params['clientId']);
        this.client = await this.clientsService.getClient(params['clientId']);
        this.package = await this.packageService.getPackage(this.client?.package_id + '');
      }
    });
  
  }

}
