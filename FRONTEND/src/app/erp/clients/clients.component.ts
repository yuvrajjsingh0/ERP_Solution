import { Component, OnInit } from '@angular/core';
import Client from 'src/app/models/Client';
import Package from 'src/app/models/Package';
import { ClientsService } from 'src/app/services/clients.service';
import { PackagesService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  contentLoaded: number = 20;

  isEditing: boolean = false;
  name: string = "";
  phone_num: string = "";
  email: string = "";
  clientPackage: string = '-2';

  isAdding:boolean = false;
  isSaving: boolean = false;

  editingClient: Client | undefined;

  deletingRes: number = -1;

  alert = {
    status: 0,
    success: '',
    failure: ''
  }

  packages: Array<Package> = [];

  formErrors: Array<string> = ['', '', '', ''];

  clients: Array<Client> = [];

  constructor(
    private clientsService: ClientsService,
    private packagesService: PackagesService){}

  async ngOnInit(){
    for(let i = 0; i < 5; i++){
      setTimeout(() => {
        this.contentLoaded += i*8;
      }, 1000*i)
    }

    this.packagesService.getPackages().then((res) => {
      this.packages = res;
      this.contentLoaded += 20;
    }).catch(err => console.log(err));
    
    this.clientsService.getClients().then((res) => {
      console.log(res);
      this.clients = res;
      this.contentLoaded += 20;
    }).catch(err => {
      console.log(err);
    });
  }

  addNewClient(){
    this.isSaving = true;
    let client: Client = {
      name: this.name,
      phone_num: this.phone_num,
      email: this.email,
      package_id: Number(this.clientPackage)
    }
    this.clientsService.putClient(client).then((res:any) => {
      this.alert.status = 1;
      this.alert.success = "Client added successfully.";
      setTimeout(() => {
        this.alert = {
          status: 0,
          success: '',
          failure: ''
        };
      }, 5000);
      this.isSaving = false;
      this.isAdding = false;
      client.id = res.id;
      this.clients.unshift(client);

      this.name = "";
      this.phone_num = "";
      this.email = "";
      this.clientPackage = '-2';
      console.log(res);
    }).catch(err => {
      this.alert.status = 1;
      this.alert.failure = "An error occurred while adding this client.";
      setTimeout(() => {
        this.alert = {
          status: 0,
          success: '',
          failure: ''
        };
      }, 5000);
      this.isSaving = false;
      this.isAdding = false;
      console.log(err);
    })
  }

  saveClient(){
    this.formErrors = ['', '', ''];
    if(this.name == '' || this.name == undefined){
      this.formErrors[0] = "Please enter client name";
      return;
    }

    if(this.phone_num == '' || this.phone_num == undefined){
      this.formErrors[1] = "Please enter client phone number";
      return;
    }

    if(this.email == '' || this.email == undefined){
      this.formErrors[2] = "Please enter client email";
      return;
    }

    if(this.clientPackage == '-1' || this.clientPackage == '-2'){
      this.formErrors[3] = "Please select package";
      return;
    }

    if(!this.isEditing){
      this.addNewClient();
    }else{
      this.editClientSave();
    }
  }


  editClientSave() {
    this.isSaving = true;
    let client: Client = {
      id: this.editingClient?.id,
      name: this.name,
      phone_num: this.phone_num,
      email: this.email,
      package_id: Number(this.clientPackage)
    }
    this.clientsService.editClient(client).then((res:any) => {
      this.alert.status = 1;
      this.alert.success = "Client modified successfully.";
      setTimeout(() => {
        this.alert = {
          status: 0,
          success: '',
          failure: ''
        };
      }, 5000);
      this.isSaving = false;
      this.isAdding = false;
      
      let idx = this.clients.findIndex(obj => obj.id == this.editingClient?.id);
      if(idx != -1){
        this.clients[idx] = client;
      }

      this.name = "";
      this.phone_num = "";
      this.email = "";
      this.clientPackage = '-2';
      console.log(res);
    }).catch(err => {
      this.alert.status = 1;
      this.alert.failure = "An error occurred while editing this client.";
      setTimeout(() => {
        this.alert = {
          status: 0,
          success: '',
          failure: ''
        };
      }, 5000);
      this.isSaving = false;
      this.isAdding = false;
      this.isEditing = false;
      
      this.name = "";
      this.phone_num = "";
      this.email = "";
      this.clientPackage = '-2';

      console.log(err);
    });
  }

  editClient(client: Client){
    this.editingClient = client;
    this.isEditing = true;
    this.isAdding = true;

    this.name = client.name;
    this.phone_num = client.phone_num;
    this.email = client.email;
    this.clientPackage = '' + client.package_id;
  }

  delete(event: string){
    if(event == 'cancel'){
      this.deletingRes = -1;
    }else if(event == 'delete'){
      this.clientsService.deleteClient(this.deletingRes).then((res) => {
        this.alert.status = 1;
        this.alert.success = "Client deleted successfully.";
        setTimeout(() => {
          this.alert = {
            status: 0,
            success: '',
            failure: ''
          };
        }, 5000);
        let idx = this.clients.findIndex(obj => obj.id == this.deletingRes);
        if(idx != -1){
          this.clients.splice(idx, 1);
        }
        this.deletingRes = -1;
      }).catch(err => {
        this.alert.status = 1;
        this.alert.failure = "An error occurred while deleting this client.";
        setTimeout(() => {
          this.alert = {
            status: 0,
            success: '',
            failure: ''
          };
        }, 5000);
        console.log(err);
        this.deletingRes = -1;
      })
    }
  }

  getPackage(client: Client){
    return this.packages[this.packages.findIndex(obj => obj.id == client.package_id)]?.name ?? 'NaN';
  }

}
