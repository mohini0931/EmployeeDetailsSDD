import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
  performanceScore: number = 202; // Update this with your logic
  totalScore: number = 240; // Update this with your logic
  performancePercentage: number = (this.performanceScore / this.totalScore) * 100;
  rotateFull: string = '';
  rotateFill: string = '';

  constructor() {}

  ngOnInit(): void {
    const angle = (this.performancePercentage / 100) * 360;
    if (angle <= 180) {
      this.rotateFill = `rotate(${angle}deg)`;
      this.rotateFull = 'rotate(0deg)';
    } else {
      this.rotateFill = 'rotate(180deg)';
      this.rotateFull = `rotate(${angle - 180}deg)`;
    }
  }
}
