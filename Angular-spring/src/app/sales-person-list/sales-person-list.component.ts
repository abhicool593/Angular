import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list-bootstrap.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {

  //create an array of objects
  salesPersonList: SalesPerson[] = [
    new SalesPerson("Anup", "Kumar", "anup.kumar@gmail.com",200),
    new SalesPerson("John", "Doe", "john.doe@gmail.com",300),
    new SalesPerson("Raj", "Kumar", "raj.kumar@gmail.com",400),
    new SalesPerson("Abhishek", "Kumar", "abhishek.kumar@gmail.com",800),
    new SalesPerson("Anusha", "Kumari", "anusha.kumari@gmail.com",500)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
