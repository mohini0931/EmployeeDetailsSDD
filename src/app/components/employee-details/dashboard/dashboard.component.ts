import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  currentDate: Date = new Date();
  employee = { name: 'Mohini' };
  employeeId: string;

  employeeExpenses = [
    {
      name: 'Alena Gouse',
      role: 'UI Designer - UID1',
      salary: 60,
      bonuses: 10,
      entertainment: 5,
      claims: 5,
      image: '../../../../assets/woman.png',
    },
    {
      name: 'Alan Walker',
      role: 'UI Designer - UID3',
      salary: 50,
      bonuses: 15,
      entertainment: 5,
      claims: 10,
      image: '../../../../assets/man.png',
    },
    {
      name: 'Avery Arwood',
      role: 'UI Designer - UID2',
      salary: 40,
      bonuses: 20,
      entertainment: 10,
      claims: 5,
      image: '../../../../assets/woman2.png',
    },
  ];
  thisYearData = [80, 90, 70, 100];
  lastYearData = [60, 70, 50, 80];
  labels = ['Q1', 'Q2', 'Q3', 'Q4'];

  constructor(private router: Router, private route: ActivatedRoute){
    this.employeeId = this.route.snapshot.paramMap.get('id') || ''; // Retrieve the employee ID from the route
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }
  ngAfterViewInit(): void {
    this.drawCircle(84.34); // Example fill percentage
  }
  onAttendanceClick(){
    this.router.navigate([`/employee-details`, this.employeeId, 'attendance']);
  }
  onLeavesClick(){
    this.router.navigate([`/employee-details`, this.employeeId, 'leave']);
  }
  drawCircle(percentage: number): void {
    const canvas = document.getElementById(
      'performanceCircle'
    ) as HTMLCanvasElement;
    if (canvas.getContext) {
      const context = canvas.getContext('2d');
      if (context) {
        const startAngle = -Math.PI / 2; // Start at the top
        const endAngle = startAngle + 2 * Math.PI * (percentage / 100);

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the background circle
        context.beginPath();
        context.arc(
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 2 - 10,
          0,
          2 * Math.PI
        );
        context.lineWidth = 10;
        context.strokeStyle = '#e0e0e0'; // Light gray
        context.stroke();

        // Draw the filled arc
        context.beginPath();
        context.arc(
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 2 - 10,
          startAngle,
          endAngle
        );
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
