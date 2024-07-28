import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-expense', // Selector for the reusable expense component
  templateUrl: './expense.component.html', // Template URL for the component
  styleUrls: ['./expense.component.css'] // Style URL for the component
})
export class ExpenseComponent implements AfterViewInit {
  
  // Input property to receive expenses data from the parent component
  @Input() expenses: { name: string, role: string, salary: number, bonuses: number, entertainment: number, claims: number, image: string }[] = [];

  // Lifecycle hook called after the component's view has been fully initialized
  ngAfterViewInit(): void {
    this.drawBars(); // Call the drawBars method to render the expense bars
  }

  // Method to calculate the total expense for an employee
  getTotal(expense: any): number {
    return expense.salary + expense.bonuses + expense.entertainment + expense.claims;
  }

  // Method to draw the expense bars on the canvas
  drawBars(): void {
    this.expenses.forEach((expense, index) => {
      const canvas: any = document.getElementById(`canvas-${index}`); // Get the canvas element by ID
      if (canvas) {
        const ctx = canvas.getContext('2d'); // Get the 2D drawing context
        const total = this.getTotal(expense); // Calculate the total expense

        // Calculate the width of each bar segment based on the total expense
        const salaryWidth = (expense.salary / total) * canvas.width;
        const bonusesWidth = (expense.bonuses / total) * canvas.width;
        const entertainmentWidth = (expense.entertainment / total) * canvas.width;
        const claimsWidth = (expense.claims / total) * canvas.width;

        // Draw the salary bar segment
        ctx.fillStyle = '#2196f3'; // Salary color
        ctx.fillRect(0, 0, salaryWidth, canvas.height);

        // Draw the bonuses bar segment
        ctx.fillStyle = '#a8c2f0'; // Bonuses color
        ctx.fillRect(salaryWidth, 0, bonusesWidth, canvas.height);

        // Draw the entertainment bar segment
        ctx.fillStyle = '#7cbad3'; // Entertainment color
        ctx.fillRect(salaryWidth + bonusesWidth, 0, entertainmentWidth, canvas.height);

        // Draw the claims bar segment
        ctx.fillStyle = '#b9bfb9'; // Claims color
        ctx.fillRect(salaryWidth + bonusesWidth + entertainmentWidth, 0, claimsWidth, canvas.height);
      }
    });
  }
}
