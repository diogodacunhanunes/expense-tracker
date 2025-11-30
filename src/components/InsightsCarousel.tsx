import { useState } from "react";
import { Expense } from "../App";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface InsightsCarouselProps {
  expenses: Expense[];
}

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ef4444",
  "#06b6d4",
];

export function InsightsCarousel({ expenses }: InsightsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide 1: Expenses by Category (Pie Chart)
  const categoryData: { [key: string]: number } = {};
  expenses.forEach((exp) => {
    categoryData[exp.category] = (categoryData[exp.category] || 0) + exp.amount;
  });
  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
  }));

  // Slide 2: Spending Trend (Line Chart)
  const trendData: { [key: string]: number } = {};
  expenses.forEach((exp) => {
    const date = new Date(exp.date);
    const dateKey = `${date.getMonth() + 1}/${date.getDate()}`;
    trendData[dateKey] = (trendData[dateKey] || 0) + exp.amount;
  });
  const lineData = Object.entries(trendData)
    .sort((a, b) => {
      const [monthA, dayA] = a[0].split("/").map(Number);
      const [monthB, dayB] = b[0].split("/").map(Number);
      return monthA === monthB ? dayA - dayB : monthA - monthB;
    })
    .map(([date, amount]) => ({
      date,
      amount: parseFloat(amount.toFixed(2)),
    }));

  // Slide 3: Top Expenses (Bar Chart)
  const topExpenses = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)
    .map((exp) => ({
      name:
        exp.description.length > 20
          ? exp.description.substring(0, 20) + "..."
          : exp.description,
      amount: exp.amount,
    }));

  // Slide 4: Category Comparison (Bar Chart)
  const categoryBarData = Object.entries(categoryData)
    .map(([name, value]) => ({
      category: name,
      amount: parseFloat(value.toFixed(2)),
    }))
    .sort((a, b) => b.amount - a.amount);

  const slides = [
    {
      title: "Expenses by Category",
      content:
        pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `€${value}`} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[320px] text-slate-400">
            No data available
          </div>
        ),
    },
    {
      title: "Spending Trend",
      content:
        lineData.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
              <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ fill: "#6366f1", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[320px] text-slate-400">
            No data available
          </div>
        ),
    },
    {
      title: "Top 5 Expenses",
      content:
        topExpenses.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={topExpenses} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                type="number"
                stroke="#64748b"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#64748b"
                style={{ fontSize: "12px" }}
                width={120}
              />
              <Tooltip formatter={(value) => `$${value}`} />
              <Bar dataKey="amount" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[320px] text-slate-400">
            No data available
          </div>
        ),
    },
    {
      title: "Category Breakdown",
      content:
        categoryBarData.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={categoryBarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="category"
                stroke="#64748b"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
              <Tooltip formatter={(value) => `€${value}`} />
              <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]}>
                {categoryBarData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[320px] text-slate-400">
            No data available
          </div>
        ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-slate-900">{slides[currentSlide].title}</h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="mb-6">{slides[currentSlide].content}</div>

      {/* Dot Navigation */}
      <div className="flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-indigo-600 w-8"
                : "bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
