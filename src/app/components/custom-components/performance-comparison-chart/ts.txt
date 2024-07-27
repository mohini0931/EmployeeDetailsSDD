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

  constructor() { }

  ngOnInit(): void { }
}
