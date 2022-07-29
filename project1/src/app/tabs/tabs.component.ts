import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  characters = [
    {name: 'Raj kumar',side: ''},
    {name: 'Abhi Mahi',side: ''}
  ];
  chosenList = 'all';

  constructor() { }

  ngOnInit(): void {
  }

  onChoose(side){
     this.chosenList = side;
  }

  getCharacters(){
    if(this.chosenList === 'all'){
      return this.characters.slice();
    }
    return this.characters.filter((char)=>{
      return char.side === this.chosenList;
    })
  }

  onSideChoosen(charInfo){
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    })
    this.characters[pos].side = charInfo.side;

  }

}
