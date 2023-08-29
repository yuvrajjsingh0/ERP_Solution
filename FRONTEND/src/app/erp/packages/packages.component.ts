import { Component } from '@angular/core';
import Package from 'src/app/models/Package';
import { PackagesService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent {

  isEditing: boolean = false;
  editingPackage: Package | undefined;

  name: string = "";
  frequency: string = "monthly";
  price: number = 0;
  description: string = "";
  meta: string = "";

  isAdding:boolean = false;
  isSaving: boolean = false;

  deletingRes: number = -1;

  alert = {
    status: 0,
    success: '',
    failure: ''
  }

  packages: Array<Package> = [];

  formErrors: Array<string> = ['', '', ''];

  constructor(private packageService: PackagesService){}

  ngOnInit(){
    this.packageService.getPackages().then((res) => {
      console.log(res);
      this.packages = res;
    }).catch(err => {
      console.log(err);
    });
  }

  addNewPackage(){
    this.isSaving = true;
    let packageT: Package = {
      name: this.name,
      frequency: this.frequency,
      price: this.price,
      description: this.description,
      meta: this.meta
    };
    this.packageService.putPackage(packageT).then((res:any) => {
      this.alert.status = 1;
      this.alert.success = "Package added successfully.";
      setTimeout(() => {
        this.alert = {
          status: 0,
          success: '',
          failure: ''
        };
      }, 5000);
      this.isSaving = false;
      this.isAdding = false;
      packageT.id = res.id;
      this.packages.unshift(packageT);
      this.name = "";
      this.price = 0;
      this.description = "";
      this.meta = "";
      this.frequency = "monthly";
      console.log(res);
    }).catch(err => {
      this.alert.status = 1;
      this.alert.failure = "An error occurred while adding the package.";
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
    });
  }

  savePackage(){
    this.formErrors = ['', '', ''];
    if(this.name == '' || this.name == undefined){
      this.formErrors[0] = "Please enter package name";
      return;
    }

    if(this.price == 0 || this.price == undefined){
      this.formErrors[1] = "Please enter package price";
      return;
    }

    if(!this.isEditing){
      this.addNewPackage();
    }else{
      this.editPackageSave();
    }
  }

  editPackageSave() {
    this.isSaving = true;
    let packageT: Package = {
      id: this.editingPackage?.id,
      name: this.name,
      frequency: this.frequency,
      price: this.price,
      description: this.description,
      meta: this.meta
    };
    this.packageService.editPackage(packageT).then((res:any) => {
      this.alert.status = 1;
      this.alert.success = "Package modified successfully.";
      setTimeout(() => {
        this.alert = {
          status: 0,
          success: '',
          failure: ''
        };
      }, 5000);
      this.isSaving = false;
      this.isAdding = false;
      
      let idx = this.packages.findIndex(obj => obj.id == this.editingPackage?.id);
      if(idx != -1){
        this.packages[idx] = packageT;
      }

      this.name = "";
      this.price = 0;
      this.description = "";
      this.meta = "";
      this.frequency = "monthly";
      this.isEditing = false;
      this.editingPackage = undefined;
      console.log(res);
    }).catch(err => {
      this.alert.status = 1;
      this.alert.failure = "An error occurred while editing this package.";
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
      this.editingPackage = undefined;
      this.name = "";
      this.price = 0;
      this.description = "";
      this.meta = "";
      this.frequency = "monthly";
      console.log(err);
    });
  }

  delete(event: string){
    if(event == 'cancel'){
      this.deletingRes = -1;
    }else if(event == 'delete'){
      this.packageService.deletePackage(this.deletingRes).then((res) => {
        this.alert.status = 1;
        this.alert.success = "Package deleted successfully.";
        setTimeout(() => {
          this.alert = {
            status: 0,
            success: '',
            failure: ''
          };
        }, 5000);
        let idx = this.packages.findIndex(obj => obj.id == this.deletingRes);
        if(idx != -1){
          this.packages.splice(idx, 1);
        }
        this.deletingRes = -1;
      }).catch(err => {
        this.alert.status = 1;
        this.alert.failure = "An error occurred while deleting this package.";
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

  editPackage(packageT: Package){
    this.editingPackage = packageT;
    this.isEditing = true;
    this.isAdding = true;
    this.name = packageT.name;
    this.frequency = packageT.frequency;
    this.price = packageT.price;
    this.description = packageT.description ?? "";
    this.meta = packageT.meta ?? "";
  }
}
