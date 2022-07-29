import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.css']
})
export class CartComponentComponent implements OnInit {
  @Input() items =[];//@Input to make something settable from outside
  newItem = '';
  @Output() itemAdded = new EventEmitter<string>();//to be able to listen to from outside

  onclick(){
    this.itemAdded.emit(this.newItem);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
