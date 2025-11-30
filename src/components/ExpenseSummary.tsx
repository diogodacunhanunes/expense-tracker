import { Expense } from "../App";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface ExpenseSummaryProps {
  expenses: Expense[];
  timeFilter: "all" | "month" | "average" | "category";
  onFilterChange: (filter: "all" | "month" | "average" | "category") => void;
}

export function ExpenseSummary({
  expenses,
  timeFilter,
  onFilterChange,
}: ExpenseSummaryProps) {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Get current month expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthExpenses = expenses.filter((exp) => {
    const expDate = new Date(exp.date);
    return (
      expDate.getMonth() === currentMonth &&
      expDate.getFullYear() === currentYear
    );
  });
  const monthlyTotal = currentMonthExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0,
  );

  // Get average expense
  const avgExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  // Get most expensive category
  const categoryTotals: { [key: string]: number } = {};
  expenses.forEach((exp) => {
    categoryTotals[exp.category] =
      (categoryTotals[exp.category] || 0) + exp.amount;
  });
  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const cards = [
    {
      id: "all",
      title: "Total Expenses",
      value: `€${totalExpenses.toFixed(2)}`,
      icon: DollarSign,
      color: "bg-gradient-to-br from-violet-500 to-purple-600",
      iconBg: "bg-white/20",
    },
    {
      id: "month",
      title: "This Month",
      value: `€${monthlyTotal.toFixed(2)}`,
      icon: TrendingUp,
      color: "bg-gradient-to-br from-blue-500 to-cyan-600",
      iconBg: "bg-white/20",
    },
    {
      id: "average",
      title: "Average Expense",
      value: `€${avgExpense.toFixed(2)}`,
      icon: Wallet,
      color: "bg-gradient-to-br from-emerald-500 to-teal-600",
      iconBg: "bg-white/20",
    },
    {
      id: "category",
      title: "Top Category",
      value: topCategory ? topCategory[0] : "N/A",
      icon: TrendingDown,
      color: "bg-gradient-to-br from-orange-500 to-red-600",
      iconBg: "bg-white/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isSelected = timeFilter === card.id;
        return (
          <button
            key={index}
            onClick={() =>
              onFilterChange(
                card.id as "all" | "month" | "average" | "category",
              )
            }
            className={`${
              card.color
            } rounded-2xl p-6 text-white shadow-xl text-left transition-all duration-300 ${
              isSelected
                ? "scale-105 ring-4 ring-white"
                : "opacity-70 hover:opacity-90"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${card.iconBg} p-3 rounded-xl`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-white/80 text-sm mb-1">{card.title}</p>
            <p className="text-3xl">{card.value}</p>
          </button>
        );
      })}
    </div>
  );
}
