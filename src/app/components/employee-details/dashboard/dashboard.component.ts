import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  currentDate: Date = new Date();
  employee = {name:'Mohini'};
  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }
  ngAfterViewInit(): void {
    this.drawCircle(84.34); // Example fill percentage
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
