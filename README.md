Finance Dashboard

A modern and responsive Finance Dashboard built using React + TailwindCSS + Recharts.  
This application allows users to track income and expenses with role-based access and interactive data visualization.

Features

Role-Based Access (RBAC)
- Viewer
  - View transactions, charts, and insights
- Admin
  - Add new transactions
  - Delete transactions
  - Reset all data

Dashboard Functionalities

Balance Overview
  - Total Balance
  - Total Income
  - Total Expenses

Charts
  - Line chart for financial trend
  - Pie chart for spending breakdown

Transactions Table
  - Search by category
  - Filter by income/expense
  - Add/Delete transactions (Admin only)

Insights
  - Top spending category
  - Total expenses
  - Smart summary message

UI Enhancements

- Dark Mode (with persistence)
- Fully responsive (mobile, tablet, desktop)
- Smooth hover and transition effects

Data Persistence

- Transactions stored in localStorage
- Theme preference stored in localStorage

Tech Stack

- Frontend: React (Vite)
- Styling: Tailwind CSS
- Charts: Recharts
- State Management: React Hooks (useState, useEffect)

Setup Instructions:

1. Clone the repository

git clone https://github.com/Rakshith7Tech/finance-dashboard.git
cd fin-dash

2. Install dependencies
npm install

3. Run the project
npm run dev

4. Open in browser
http://localhost:5173
