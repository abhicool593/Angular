import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupformComponent } from '../popupform/popupform.component';


@Component({
  selector: 'app-delegate',
  templateUrl: './delegate.component.html',
  styleUrls: ['./delegate.component.css']
})
export class DelegateComponent implements OnInit {
  title = 'dda';

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCreate() : void{
    //this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(PopupformComponent,dialogConfig);

  }
}
