import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-performance-comparison-chart',
  templateUrl: './performance-comparison-chart.component.html',
  styleUrls: ['./performance-comparison-chart.component.css']
})
export class PerformanceComparisonChartComponent implements OnInit {
  @Input() thisYearData: number[] = [];
  @Input() lastYearData: number[] = [];
  @Input() labels: string[] = [];
  @Input() title: string = '';

  constructor() { }

  ngOnInit(): void { 
    if(this.thisYearData.length === 0)
      {
        this.thisYearData = [80, 90, 70, 100];
        this.lastYearData = [60, 70, 50, 80];
        this.labels = ["Q1", "Q2", "Q3", "Q4"];
        this.title = 'Performance Comparison';
      }
  }
}
