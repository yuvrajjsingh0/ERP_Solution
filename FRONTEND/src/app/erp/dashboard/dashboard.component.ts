import { ApplicationRef, ChangeDetectorRef, Component } from '@angular/core';
import { InsightsService } from 'src/app/services/insights.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  chartOneOptions:any = {};
  chartTwoOptions:any = {};

  paymentChartWeek: string = 'this';

  totalNumberOfUsers: number = this.insightsService.totalNumberOfUsers;
  totalNumberOfUsersChange: number = this.insightsService.totalNumberOfUsersChange;

  totalPayments: number = this.insightsService.totalPayments;
  totalPaymentsChange: number = this.insightsService.totalPaymentsChange;

  paymentsByWeek: any = this.insightsService.paymentsByWeek;
  paymentsByMonth: any = this.insightsService.paymentsByMonth;

  constructor(
    private insightsService: InsightsService,
    private appRef: ApplicationRef
  ){

    this.insightsService.getTotalNumberOfUsers().then(res => {
      this.totalNumberOfUsers = this.insightsService.totalNumberOfUsers;
      this.totalNumberOfUsersChange = this.insightsService.totalNumberOfUsersChange;
    }).catch(err => console.log(err));

    this.insightsService.getTotalPayments().then(res => {
      this.totalPayments = this.insightsService.totalPayments;
      this.totalPaymentsChange = this.insightsService.totalPaymentsChange;
    }).catch(err => console.log(err));

    this.insightsService.getPaymentsByWeek().then(res => {
      this.paymentsByWeek = this.insightsService.paymentsByWeek;
      this.prepareChartTwo('this');
    }).catch(err => console.log(err));

    this.insightsService.getPaymentsByMonth().then(res => {
      this.paymentsByMonth = this.insightsService.paymentsByMonth;
      this.prepareChartOne();
    }).catch(err => console.log(err));

  }

  ngOnInit(){
    this.chartOneOptions = {
      series: [
        {
          name: "Payments in ₹",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
        },
      ],
      legend: {
        show: false,
        position: "top",
        horizontalAlign: "left",
      },
      colors: ["#3C50E0"],
      chart: {
        fontFamily: "Satoshi, sans-serif",
        height: 335,
        type: "area",
        dropShadow: {
          enabled: true,
          color: "#623CEA14",
          top: 10,
          blur: 4,
          left: 0,
          opacity: 0.1,
        },
  
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              height: 300,
            },
          },
        },
        {
          breakpoint: 1366,
          options: {
            chart: {
              height: 350,
            },
          },
        },
      ],
      stroke: {
        width: [2, 2],
        curve: "straight",
      },
      labels: {
        show: false,
        position: "top",
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 4,
        colors: "#fff",
        strokeColors: ["#3056D3", "#80CAEE"],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        hover: {
          size: undefined,
          sizeOffset: 5,
        },
      },
      xaxis: {
        type: "category",
        categories: [
          "Sep",
          "Oct",
          "Nov",
          "Dec",
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        title: {
          style: {
            fontSize: "0px",
          },
        },
        // min: 0,
        // max: 100,
      },
    };




    this.chartTwoOptions = {
      series: [
        {
          name: "Payments",
          data: [44, 55, 41, 67, 22, 43, 65],
        }
      ],
      colors: ["#3056D3"],
      chart: {
        type: "bar",
        height: 335,
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
  
      responsive: [
        {
          breakpoint: 1536,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 0,
                columnWidth: "25%",
              },
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 0,
          columnWidth: "25%",
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "last",
        },
      },
      dataLabels: {
        enabled: false,
      },
  
      xaxis: {
        categories: ["M", "T", "W", "T", "F", "S", "S"],
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        fontFamily: "Satoshi",
        fontWeight: 500,
        fontSize: "14px",
  
        markers: {
          radius: 99,
        },
      },
      fill: {
        opacity: 1,
      },
    };
  }

  weekChangedChartTwo(){
    if(this.paymentChartWeek == 'this'){
      this.prepareChartTwo('this');
    }else{
      this.prepareChartTwo('last');
    }
  }

  chartTwo = true;
  prepareChartTwo(week: string){
    this.chartTwo = false;
    if(week == 'this'){
      let data = [
        this.paymentsByWeek?.paymentsThisWeek?.Monday?.length,
        this.paymentsByWeek?.paymentsThisWeek?.Tuesday?.length,
        this.paymentsByWeek?.paymentsThisWeek?.Wednesday?.length,
        this.paymentsByWeek?.paymentsThisWeek?.Thursday?.length,
        this.paymentsByWeek?.paymentsThisWeek?.Friday?.length,
        this.paymentsByWeek?.paymentsThisWeek?.Saturday?.length,
        this.paymentsByWeek?.paymentsThisWeek?.Sunday?.length ];

      this.chartTwoOptions.series[0].data = data;
      this.appRef.tick();
      console.log(data);
    }else if(week == 'last'){
      let data = [
        this.paymentsByWeek?.paymentsLastWeek?.Monday?.length,
        this.paymentsByWeek?.paymentsLastWeek?.Tuesday?.length,
        this.paymentsByWeek?.paymentsLastWeek?.Wednesday?.length,
        this.paymentsByWeek?.paymentsLastWeek?.Thursday?.length,
        this.paymentsByWeek?.paymentsLastWeek?.Friday?.length,
        this.paymentsByWeek?.paymentsLastWeek?.Saturday?.length,
        this.paymentsByWeek?.paymentsLastWeek?.Sunday?.length ];

      this.chartTwoOptions.series[0].data = data;
      this.appRef.tick();
      console.log(data);
    }
    this.chartTwo = true;
  }

  chartOne = true;
  prepareChartOne(){

    this.chartOne = false;

    let cats:any = [
      ...Object.values(this.paymentsByMonth?.monthsOrder)
    ];

    let data = [];
    for(let cat of cats){
      data.push(this.paymentsByMonth?.paymentsLast12Months[cat]);
    }

    this.chartOneOptions.series[0].data = data;
    this.chartOneOptions.xaxis.categories = cats;


    this.appRef.tick();

    this.chartOne = true;

  }

}
