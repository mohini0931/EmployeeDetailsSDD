import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-performance-circle',
  templateUrl: './performance-circle.component.html',
  styleUrls: ['./performance-circle.component.css']
})
export class PerformanceCircleComponent implements OnInit, AfterViewInit {
  @Input() percentage: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.drawCircle(this.percentage);
  }

  drawCircle(percentage: number): void {
    const canvas = document.getElementById('performanceCircle') as HTMLCanvasElement;
    if (canvas.getContext) {
      const context = canvas.getContext('2d');
      if (context) {
        const startAngle = -Math.PI / 2; // Start at the top
        const endAngle = startAngle + (2 * Math.PI * (percentage / 100));

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the background circle
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, 0, 2 * Math.PI);
        context.lineWidth = 10;
        context.strokeStyle = '#e0e0e0'; // Light gray
        context.stroke();

        // Draw the filled arc
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, startAngle, endAngle);
        context.lineWidth = 10;
        context.strokeStyle = '#007bff'; // Blue
        context.stroke();

        // Draw the percentage text
        context.font = '18px Arial';
        context.fillStyle = '#007bff';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(`${percentage}%`, canvas.width / 2, canvas.height / 2);
      }
    }
  }
}
