import { Component } from '@angular/core';
import { SessionStorageService } from 'src/app/services/util/session-storage.service';
import { WorkersService } from 'src/app/services/workers.service';
import Worker from 'src/app/models/Worker';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent {

  isEditing: boolean = false;
  name: string = "";
  phone_num: string = "";
  salary: number = 0;

  isAdding:boolean = false;
  isSaving: boolean = false;

  editingWorker: Worker | undefined;

  deletingRes: number = -1;

  alert = {
    status: 0,
    success: '',
    failure: ''
  }

  formErrors: Array<string> = ['', '', '', ''];

  nextPageUrl: string = "";

  workers: Array<Worker> = [];

  constructor(
    private sessStorage: SessionStorageService,
    private workersService: WorkersService
  ){}

  async ngOnInit(){
    try{
      this.workers = this.sessStorage.getItem("workers");
    }catch(err){
      console.log("err", err);
    }

    this.workersService.getWorkers().then((res) => {
      console.log(res);
      this.workers = res;
      this.sessStorage.setItem("workers", this.workers);
    }).catch(err => {
      console.log(err);
    });

  }

  addNewWorker(){
    this.isSaving = true;
    let worker: Worker = {
      name: this.name,
      phone_num: this.phone_num,
      salary: this.salary
    }
    this.workersService.putWorker(worker).then((res:any) => {
      this.alert.status = 1;
      this.alert.success = "Worker added successfully.";
      setTimeout(() => {
        this.alert = {
          status: 0,
          success: '',
          failure: ''
        };
      }, 5000);
      this.isSaving = false;
      this.isAdding = false;
      worker.id = res.id;
      this.workers.unshift(worker);

      this.name = "";
      this.phone_num = "";
      this.salary = 0;
      console.log(res);
    }).catch(err => {
      this.alert.status = 1;
      this.alert.failure = "An error occurred while adding this worker.";
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

  saveWorker(){
    this.formErrors = ['', '', ''];
    if(this.name == '' || this.name == undefined){
      this.formErrors[0] = "Please enter worker name";
      return;
    }

    if(this.phone_num == '' || this.phone_num == undefined){
      this.formErrors[1] = "Please enter worker phone number";
      return;
    }

    if(this.salary == 0 || this.salary == undefined){
      this.formErrors[2] = "Please enter worker salary";
      return;
    }

    if(!this.isEditing){
      this.addNewWorker();
    }else{
      this.editWorkerSave();
    }
  }


  editWorkerSave() {
    this.isSaving = true;
    let worker: Worker = {
      id: this.editingWorker?.id,
      name: this.name,
      phone_num: this.phone_num,
      salary: this.salary
    }
    this.workersService.editWorker(worker).then((res:any) => {
      this.alert.status = 1;
      this.alert.success = "Worker modified successfully.";
      setTimeout(() => {
        this.alert = {
          status: 0,
          success: '',
          failure: ''
        };
      }, 5000);
      this.isSaving = false;
      this.isAdding = false;
      
      let idx = this.workers.findIndex(obj => obj.id == this.editingWorker?.id);
      if(idx != -1){
        this.workers[idx] = worker;
      }

      this.name = "";
      this.phone_num = "";
      this.salary = 0;
      console.log(res);
    }).catch(err => {
      this.alert.status = 1;
      this.alert.failure = "An error occurred while editing this worker.";
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
      this.salary = 0;

      console.log(err);
    });
  }

  editWorker(worker: Worker){
    this.editingWorker = worker;
    this.isEditing = true;
    this.isAdding = true;

    this.name = worker.name;
    this.phone_num = worker.phone_num;
    this.salary = worker.salary;
  }

  delete(event: string){
    if(event == 'cancel'){
      this.deletingRes = -1;
    }else if(event == 'delete'){
      this.workersService.deleteWorker(this.deletingRes).then((res) => {
        this.alert.status = 1;
        this.alert.success = "Worker deleted successfully.";
        setTimeout(() => {
          this.alert = {
            status: 0,
            success: '',
            failure: ''
          };
        }, 5000);
        let idx = this.workers.findIndex(obj => obj.id == this.deletingRes);
        if(idx != -1){
          this.workers.splice(idx, 1);
        }
        this.deletingRes = -1;
      }).catch(err => {
        this.alert.status = 1;
        this.alert.failure = "An error occurred while deleting this worker.";
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


}
