import { Component, ViewChild, Inject} from '@angular/core';
import { Sort } from '@angular/material';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RulesComponent } from './rules/rules.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ibill';

  Cust = [
    { value: 'ATC-0', viewValue: 'ATC' },
    { value: 'Aircel-1', viewValue: 'AIRCEL' },
    { value: 'Jio-2', viewValue: 'RELIANCE-JIO' }
  ];

  reg = [
    { value: 'north', viewValue: 'North' },
    { value: 'south', viewValue: 'South' },
    { value: 'east', viewValue: 'East' },
    { value: 'west', viewValue: 'West' }
  ];

  displayedColumns = ['position', 'Customer_name', 'Month', 'Number_of_sites', 'TotalGridConsumption', 'Total_DG_Run_Hours'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }




  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(RulesComponent, {
      width: '700px',
      height: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}





export interface Element {
  Customer_name: string;
  position: number;
  Month: string;
  Number_of_sites: number;
  TotalGridConsumption: number;
  Total_DG_Run_Hours: number;

}

const ELEMENT_DATA: Element[] = [
  { position: 1, Customer_name: ' SAFARICOM', Month: 'Feb', Number_of_sites: 345, TotalGridConsumption: 34567, Total_DG_Run_Hours: 56786 },
  { position: 2, Customer_name: 'ATC', Month: 'Mar', Number_of_sites: 5453, TotalGridConsumption: 54677, Total_DG_Run_Hours: 7890 },
  { position: 3, Customer_name: 'VIOM', Month: 'Jun', Number_of_sites: 656, TotalGridConsumption: 7890, Total_DG_Run_Hours: 7890 },
  { position: 4, Customer_name: 'BIL', Month: 'Apr', Number_of_sites: 678, TotalGridConsumption: 56789, Total_DG_Run_Hours: 67890 },
  { position: 5, Customer_name: 'GTL', Month: 'May', Number_of_sites: 56, TotalGridConsumption: 78908, Total_DG_Run_Hours: 56786 },
  { position: 6, Customer_name: 'INDUS', Month: 'Dec', Number_of_sites: 6789, TotalGridConsumption: 6786, Total_DG_Run_Hours: 65467},
];
