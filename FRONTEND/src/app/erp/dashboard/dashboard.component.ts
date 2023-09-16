import { Component } from '@angular/core';
import { InsightsService } from 'src/app/services/insights.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  totalNumberOfUsers: number = this.insightsService.totalNumberOfUsers;
  totalNumberOfUsersChange: number = this.insightsService.totalNumberOfUsersChange;

  totalPayments: number = this.insightsService.totalPayments;
  totalPaymentsChange: number = this.insightsService.totalPaymentsChange;

  constructor(private insightsService: InsightsService){

    this.insightsService.getTotalNumberOfUsers().then(res => {
      this.totalNumberOfUsers = this.insightsService.totalNumberOfUsers;
      this.totalNumberOfUsersChange = this.insightsService.totalNumberOfUsersChange;
    }).catch(err => console.log(err));

    this.insightsService.getTotalPayments().then(res => {
      this.totalPayments = this.insightsService.totalPayments;
      this.totalPaymentsChange = this.insightsService.totalPaymentsChange;
    }).catch(err => console.log(err));

  }

  ngOnInit(){
    
  }

}
