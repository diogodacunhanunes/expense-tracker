import { Expense } from "../App";
import { Trash2, Calendar } from "lucide-react";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const CATEGORY_COLORS: { [key: string]: string } = {
  Food: "bg-orange-100 text-orange-700",
  Transportation: "bg-blue-100 text-blue-700",
  Utilities: "bg-yellow-100 text-yellow-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Health: "bg-green-100 text-green-700",
  Education: "bg-indigo-100 text-indigo-700",
  Shopping: "bg-pink-100 text-pink-700",
  Other: "bg-gray-100 text-gray-700",
};

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-slate-900 mb-6">Recent Transactions</h2>
      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
        {expenses.length > 0 ? (
          expenses.slice(0, 10).map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-slate-900">{expense.description}</p>
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other
                    }`}
                  >
                    {expense.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {formatDate(expense.date)}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-slate-900">€{expense.amount.toFixed(2)}</p>
                <button
                  onClick={() => onDelete(expense.id)}
                  className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-[320px] text-slate-400">
            No transactions yet
          </div>
        )}
      </div>
    </div>
  );
}
