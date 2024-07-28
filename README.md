Employee Management System
Overview
The Employee Management System is a comprehensive web application developed using Angular 17. It allows users to manage employee details efficiently, including adding, editing, and deleting employee records. The application leverages Angular Material for a consistent and responsive UI design, CSS3 for styling, and HTML5 for markup. State management is handled by NGRX, ensuring a robust and scalable architecture. The project includes comprehensive test cases to ensure reliability and correctness of functionality.

Features
Employee Management: Add, edit, and delete employee records.
Responsive UI: Optimized for various screen sizes using CSS3 and Angular Material.
State Management: Utilizes NGRX for state management.
Custom Components: Modular and reusable components for different functionalities.
User Authentication: Secure login system with role-based access control.
Real-time Data Updates: Automatically updates the employee list upon changes.
Notifications: Success and error messages displayed using snack bars.
Test Cases: Comprehensive unit tests to ensure application stability [Written and executed for login and employee-list component]
Mock API: Uses json-server to perform CRUD operations and to get Employee Details.

Technologies Used
Angular 17: Framework for building the application.
Angular Material: UI component library for responsive design.
CSS3: Styling the application.
HTML5: Markup for the application.
NGRX: State management library.
Jasmine/Karma: Testing framework for unit tests.
json-server: Mock API server for performing CRUD operations.

PROJECT STRUCTURE

src/
│
├── app/
│ ├── components/
│ │ ├── custom-components/
│ │ │ ├── delete-confirmation-dialog/
│ │ │ │ ├── delete-confirmation-dialog.component.html
│ │ │ │ ├── delete-confirmation-dialog.component.ts
│ │ │ │ ├── delete-confirmation-dialog.component.css
│ │ ├── employee-add/
│ │ │ ├── employee-add.component.html
│ │ │ ├── employee-add.component.ts
│ │ │ ├── employee-add.component.css
│ │ ├── employee-details/
│ │ │ ├── dashboard/
│ │ │ │ ├── dashboard.component.html
│ │ │ │ ├── dashboard.component.ts
│ │ │ │ ├── dashboard.component.css
│ │ │ ├── employee-details.component.html
│ │ │ ├── employee-details.component.ts
│ │ │ ├── employee-details.component.css
│ │ ├── employee-list/
│ │ │ ├── employee-list.component.html
│ │ │ ├── employee-list.component.ts
│ │ │ ├── employee-list.component.css
│ │ ├── login/
│ │ │ ├── login.component.html
│ │ │ ├── login.component.ts
│ │ │ ├── login.component.css
│ │ ├── custom-components/
│ │ │ ├── drawer/
│ │ │ │ ├── drawer.component.html
│ │ │ │ ├── drawer.component.ts
│ │ │ │ ├── drawer.component.css
│ │ │ ├── expense/
│ │ │ │ ├── expense.component.html
│ │ │ │ ├── expense.component.ts
│ │ │ │ ├── expense.component.css
│
├── store/
│ ├── actions/
│ │ ├── employee.actions.ts
│ ├── reducers/
│ │ ├── employee.reducer.ts
│ ├── selectors/
│ │ ├── employee.selectors.ts
│ ├── effects/
│ │ ├── employee.effects.ts
│
├── services/
│ ├── auth.service.ts
│ ├── employee.service.ts
│ ├── notification.service.ts
│
├── models/
│ ├── employee.model.ts
│
├── guards/
│ ├── auth.guard.ts
│
├── tests/
│ ├── employee-list.component.spec.ts
│ ├── login.component.spec.ts

Custom Components

Performance Chart component.
Performance Circle component.
DrawerComponent: Reusable side drawer component.
ExpenseComponent: Custom component to display employee expenses.
DeleteConfirmationDialogComponent: Confirmation dialog for delete actions.

Mock API with json-server
The project uses json-server to create a mock API for performing CRUD operations. This allows for quick development and testing without needing a backend server.

Getting Started
Prerequisites
Node.js and npm installed.
Angular CLI installed globally.

Installation

Clone the repository:
git clone https://github.com/mohini0931/EmployeeDetailsSDD.git

Navigate to the project directory:

Install dependencies:

npm install

Running the Application
Start the development server:

ng serve
Open your browser and navigate to http://localhost:4200.

Running the Mock API
Start json-server:
json-server --watch db.json --port 3000

Running Tests
Execute the test cases:

ng test

Contributing:
Contributions are welcome! Please fork the repository and submit a pull request for review.
