import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrl: './my-team.component.css'
})
export class MyTeamComponent implements OnInit{
  @Input() teamDetails:{ id:number, name: string, lastMonth: number, role:string, 
    score:number, thisMonth:number, avatar: string, performanceCategory:string }[] = [];

  ngOnInit(): void {
    console.log("data from dashboard component="+this.teamDetails);
  }

}
