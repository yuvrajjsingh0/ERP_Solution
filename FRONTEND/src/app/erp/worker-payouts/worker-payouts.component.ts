import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import WorkerPayout from 'src/app/models/WorkerPayout';
import Worker from 'src/app/models/Worker';
import { SessionStorageService } from 'src/app/services/util/session-storage.service';
import { WorkerPayoutsService } from 'src/app/services/worker-payouts.service';
import { WorkersService } from 'src/app/services/workers.service';

@Component({
  selector: 'app-worker-payouts',
  templateUrl: './worker-payouts.component.html',
  styleUrls: ['./worker-payouts.component.scss']
})
export class WorkerPayoutsComponent {

  constructor(
    private route: ActivatedRoute,
    private workersService: WorkersService,
    private payoutsService: WorkerPayoutsService,
    private sessStorage: SessionStorageService
  ){}

  isEditing: boolean = false;

  isAdding:boolean = false;
  isSaving: boolean = false;

  formErrors: Array<string> = ['', '', '', ''];
  alert = {
    status: 0,
    success: '',
    failure: ''
  };

  payouts: Array<WorkerPayout> = [];
  worker: Worker | undefined;

  // Form models
  mode: string = "";
  amount: string = "";
  meta: string = "";

  editingWorkerPayout: WorkerPayout | undefined;

  deletingRes = -1

  ngOnInit() {
    
    try{
      this.payouts = this.sessStorage.getItem("payouts");
    }catch(err) {
      console.log("err", err);
    }
    this.route.params.subscribe(async (params) => {
      console.log(params);
  
      if (params['workerId']) { 
        console.log(params['workerId']);

        this.payoutsService.getWorkerPayoutsByWorker(params['workerId']).then((res) => {
          this.payouts = res;
          this.sessStorage.setItem("payouts", this.payouts);
        }).catch(err => {
          console.log(err);
        });

        let workers: Array<Worker> = [];
        try{
          workers = this.sessStorage.getItem("workers");
        }catch(err){
          console.log(err);
        }
        let workerIdx = workers.findIndex((obj:Worker) => obj.id == params['workerId']);
        if(workerIdx != -1){
          console.log(this.worker);
          this.worker = workers[workerIdx];
        }

        if(this.worker == undefined){
          await this.workersService.getWorker(params['workerId']).then((worker) => {
            this.worker = worker;
            this.amount = '' + worker.salary;
            console.log(worker);
          }).catch(err => console.log(err));
        }
      }
    });
  
  }

  saveWorkerPayout(){
    this.formErrors = ['', '', ''];
    if(this.mode == '' || this.mode == undefined){
      this.formErrors[0] = "Please enter payment mode";
      return;
    }

    if(this.amount == '' || this.amount == undefined){
      this.formErrors[1] = "Please enter payment amount";
      return;
    }

    if(!this.isEditing){
      this.addNewWorkerPayout();
    }else{
      this.editWorkerPayoutSave();
    }
  }

  addNewWorkerPayout(){
    this.isSaving = true;

    let payment: WorkerPayout = {
      mode: this.mode,
      amount: Number(this.amount),
      worker_id: this.worker?.id ?? -1,
      meta: this.meta ?? ''
    };

    this.payoutsService.putWorkerPayout(payment).then((res:any) => {
      this.alert.status = 1;
      this.alert.success = "WorkerPayout added successfully.";
      setTimeout(() => {
        this.alert = {
          status: 0,
          success: '',
          failure: ''
        };
      }, 5000);
      this.isSaving = false;
      this.isAdding = false;
      payment.id = res.id;
      this.payouts.unshift(payment);

      this.mode = "";
      this.amount = '' + this.worker?.salary ?? "";
      this.meta = "";
      console.log(res);
    }).catch(err => {
      this.alert.status = 1;
      this.alert.failure = "An error occurred while adding this payment.";
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

  editWorkerPayoutSave() {
    this.isSaving = true;
    let payment: WorkerPayout = {
      id: this.editingWorkerPayout?.id,
      mode: this.mode,
      amount: Number(this.amount),
      meta: this.meta ?? '',
      worker_id: this.editingWorkerPayout?.worker_id ?? -1
    };
    this.payoutsService.editWorkerPayout(payment).then((res:any) => {
      this.alert.status = 1;
      this.alert.success = "WorkerPayout modified successfully.";
      setTimeout(() => {
        this.alert = {
          status: 0,
          success: '',
          failure: ''
        };
      }, 5000);
      this.isSaving = false;
      this.isAdding = false;
      
      let idx = this.payouts.findIndex(obj => obj.id == this.editingWorkerPayout?.id);
      if(idx != -1){
        this.payouts[idx] = payment;
      }

      this.mode = "";
      this.amount = '' + this.worker?.salary ?? "";
      this.meta = "";
      console.log(res);
    }).catch(err => {
      this.alert.status = 1;
      this.alert.failure = "An error occurred while editing this payment.";
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
      
      this.mode = "";
      this.amount = '' + this.worker?.salary ?? "";
      this.meta = "";
      console.log(err);
    });
  }

  editWorkerPayout(payment: WorkerPayout){
    this.editingWorkerPayout = payment;
    this.isEditing = true;
    this.isAdding = true;

    this.mode = payment.mode;
    this.amount = payment.amount + '';
    this.meta = payment.meta ?? '';
  }

  delete(event: string){
    if(event == 'cancel'){
      this.deletingRes = -1;
    }else if(event == 'delete'){
      this.payoutsService.deleteWorkerPayout(this.deletingRes).then((res) => {
        this.alert.status = 1;
        this.alert.success = "Payout deleted successfully.";
        setTimeout(() => {
          this.alert = {
            status: 0,
            success: '',
            failure: ''
          };
        }, 5000);
        let idx = this.payouts.findIndex(obj => obj.id == this.deletingRes);
        if(idx != -1){
          this.payouts.splice(idx, 1);
        }
        this.deletingRes = -1;
      }).catch(err => {
        this.alert.status = 1;
        this.alert.failure = "An error occurred while deleting this payout.";
        setTimeout(() => {
          this.alert = {
            status: 0,
            success: '',
            failure: ''
          };
        }, 5000);
        console.log(err);
        this.deletingRes = -1;
      });
    }
  }
}
