import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit, AfterViewInit {
  @Input() expenses: { name: string, role: string, salary: number, bonuses: number, entertainment: number, claims: number, image: string }[] = [];

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.drawBars();
  }

  getTotal(expense: any): number {
    return expense.salary + expense.bonuses + expense.entertainment + expense.claims;
  }

  drawBars(): void {
    this.expenses.forEach((expense, index) => {
      const canvas: any = document.getElementById(`canvas-${index}`);
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const total = this.getTotal(expense);

        const salaryWidth = (expense.salary / total) * canvas.width;
        const bonusesWidth = (expense.bonuses / total) * canvas.width;
        const entertainmentWidth = (expense.entertainment / total) * canvas.width;
        const claimsWidth = (expense.claims / total) * canvas.width;

        ctx.fillStyle = '#2196f3'; // Salary color
        ctx.fillRect(0, 0, salaryWidth, canvas.height);

        ctx.fillStyle = '#a8c2f0'; // Bonuses color
        ctx.fillRect(salaryWidth, 0, bonusesWidth, canvas.height);

        ctx.fillStyle = '#7cbad3'; // Entertainment color
        ctx.fillRect(salaryWidth + bonusesWidth, 0, entertainmentWidth, canvas.height);

        ctx.fillStyle = '#b9bfb9'; // Claims color
        ctx.fillRect(salaryWidth + bonusesWidth + entertainmentWidth, 0, claimsWidth, canvas.height);
      }
    });
  }
}
