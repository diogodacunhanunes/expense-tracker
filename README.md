# 💰 Slick Modern Expense Tracker

A beautiful, modern expense tracking application built with React, TypeScript, and Vite. Track your expenses across multiple bank accounts with stunning visualizations and insights.

![Expense Tracker](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

## ✨ Features

- 📊 **Interactive Charts** - Visualize your spending with beautiful pie charts, line graphs, and bar charts
- 💳 **Multi-Account Support** - Track expenses across multiple bank accounts
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations
- 📈 **Spending Insights** - View daily trends, top expenses, and category breakdowns
- 🔍 **Smart Filtering** - Filter by time period, category, or account
- 📂 **Excel Import** - Import your expenses from Excel files (demo mode)
- 🌍 **Euro Currency** - All amounts displayed in euros (€)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 18.3** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Charting library for data visualization
- **Lucide React** - Beautiful icon set
- **shadcn/ui** - Re-usable component library

## 📦 Project Structure

```
src/
├── components/
│   ├── AddExpenseModal.tsx      # Modal for adding new expenses
│   ├── BankAccountCarousel.tsx  # Account balance carousel
│   ├── ExpenseChart.tsx         # Pie chart visualization
│   ├── ExpenseList.tsx          # List of all expenses
│   ├── ExpenseSummary.tsx       # Summary cards with totals
│   ├── InsightsCarousel.tsx     # Detailed insights carousel
│   └── ui/                      # Reusable UI components
├── App.tsx                      # Main application component
├── main.tsx                     # Application entry point
└── index.css                    # Global styles
```

## 🎨 Features Overview

### Expense Summary Cards

- Total expenses across all accounts
- Current month's spending
- Average expense amount
- Top spending category

### Bank Account Management

- View balances across multiple accounts
- Filter expenses by account
- Aggregated total balance view

### Insights & Analytics

- **Category Spending** - Pie chart showing spending by category
- **Spending Trend** - Line chart tracking daily expenses
- **Top 5 Expenses** - Bar chart of largest transactions
- **Category Breakdown** - Detailed category analysis

### Expense Management

- Add new expenses with category and date
- Delete unwanted entries
- Filter by category
- Sort and organize transactions

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Usage

1. **Add an Expense**: Click the "Add Expense" button and fill in the details
2. **View by Account**: Use the account carousel to filter expenses by bank account
3. **Analyze Spending**: Explore the insights carousel for detailed analytics
4. **Filter Data**: Click on summary cards to filter by time period
5. **Delete Expenses**: Hover over any expense and click the trash icon

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Diogo Nunes

## 🙏 Acknowledgments

- Design inspiration from modern fintech applications
- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
