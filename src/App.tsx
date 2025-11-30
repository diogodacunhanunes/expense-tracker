import { useState, useRef, useEffect } from "react";
import { ExpenseSummary } from "./components/ExpenseSummary";
import { InsightsCarousel } from "./components/InsightsCarousel";
import { ExpenseList } from "./components/ExpenseList";
import { AddExpenseModal } from "./components/AddExpenseModal";
import {
  BankAccountCarousel,
  BankAccount,
} from "./components/BankAccountCarousel";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import {
  Plus,
  FileSpreadsheet,
  Edit3,
  ChevronDown,
  Camera,
} from "lucide-react";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  bankAccountId: string;
}

const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: "chase",
    name: "Chase Sapphire",
    last4: "4829",
    balance: 5420.75,
    color: "bg-gradient-to-br from-blue-600 to-blue-800",
  },
  {
    id: "amex",
    name: "American Express",
    last4: "1005",
    balance: 3280.5,
    color: "bg-gradient-to-br from-emerald-600 to-teal-700",
  },
  {
    id: "wells",
    name: "Wells Fargo",
    last4: "7234",
    balance: 2150.25,
    color: "bg-gradient-to-br from-orange-500 to-red-600",
  },
  {
    id: "citi",
    name: "Citi Premier",
    last4: "3956",
    balance: 1890.0,
    color: "bg-gradient-to-br from-purple-600 to-pink-600",
  },
];

const MOCK_EXPENSES: Expense[] = [
  {
    id: "1",
    description: "Grocery Shopping",
    amount: 127.5,
    category: "Food",
    date: "2025-11-28",
    bankAccountId: "chase",
  },
  {
    id: "2",
    description: "Electric Bill",
    amount: 89.0,
    category: "Utilities",
    date: "2025-11-27",
    bankAccountId: "wells",
  },
  {
    id: "3",
    description: "Netflix Subscription",
    amount: 15.99,
    category: "Entertainment",
    date: "2025-11-26",
    bankAccountId: "chase",
  },
  {
    id: "4",
    description: "Gas Station",
    amount: 45.0,
    category: "Transportation",
    date: "2025-11-25",
    bankAccountId: "amex",
  },
  {
    id: "5",
    description: "Restaurant Dinner",
    amount: 68.5,
    category: "Food",
    date: "2025-11-24",
    bankAccountId: "citi",
  },
  {
    id: "6",
    description: "Gym Membership",
    amount: 49.99,
    category: "Health",
    date: "2025-11-23",
    bankAccountId: "chase",
  },
  {
    id: "7",
    description: "Coffee Shop",
    amount: 12.5,
    category: "Food",
    date: "2025-11-22",
    bankAccountId: "amex",
  },
  {
    id: "8",
    description: "Online Course",
    amount: 99.0,
    category: "Education",
    date: "2025-11-20",
    bankAccountId: "wells",
  },
];

const USER = {
  name: "Diogo",
  photo:
    "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDQyMDIwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState<string | null>(
    null,
  );
  const [timeFilter, setTimeFilter] = useState<
    "all" | "month" | "average" | "category"
  >("all");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddExpense = (expense: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
    setIsModalOpen(false);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Mock file upload - in a real app, you'd parse the Excel file here
      console.log("File uploaded:", file.name);
      alert(
        `Excel file "${file.name}" uploaded successfully! (This is a demo - file parsing would happen here)`,
      );
      setIsDropdownOpen(false);
    }
  };

  const handleReceiptCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Mock receipt capture - in a real app, you'd use OCR to extract data
      console.log("Receipt captured:", file.name);
      alert(
        `Receipt image captured! (This is a demo - OCR would extract expense data here)`,
      );
      setIsDropdownOpen(false);
    }
  };

  const handleManualInput = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  // Filter expenses based on selected bank account
  let filteredExpenses = selectedBankAccount
    ? expenses.filter((exp) => exp.bankAccountId === selectedBankAccount)
    : expenses;

  // Apply time filter
  if (timeFilter === "month") {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    filteredExpenses = filteredExpenses.filter((exp) => {
      const expDate = new Date(exp.date);
      return (
        expDate.getMonth() === currentMonth &&
        expDate.getFullYear() === currentYear
      );
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <ImageWithFallback
              src={USER.photo}
              alt={USER.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
            />
            <div>
              <h1 className="text-slate-900">Hello, {USER.name}</h1>
              <p className="text-slate-600 mt-1">
                Manage your spending and stay on budget
              </p>
            </div>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/30"
            >
              <Plus className="w-5 h-5" />
              Add Expense
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10">
                <button
                  onClick={handleManualInput}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Edit3 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-slate-900">Manual Input</p>
                    <p className="text-sm text-slate-500">
                      Add expenses one by one
                    </p>
                  </div>
                </button>

                <div className="border-t border-slate-200"></div>

                <label className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FileSpreadsheet className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-slate-900">Upload Excel File</p>
                    <p className="text-sm text-slate-500">
                      Import from spreadsheet
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <div className="border-t border-slate-200"></div>

                <label className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Camera className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-slate-900">Scan Receipt</p>
                    <p className="text-sm text-slate-500">
                      Capture with camera
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleReceiptCapture}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Bank Account Carousel */}
        <BankAccountCarousel
          accounts={BANK_ACCOUNTS}
          selectedAccount={selectedBankAccount}
          onSelectAccount={setSelectedBankAccount}
        />

        {/* Summary Cards */}
        <ExpenseSummary
          expenses={filteredExpenses}
          timeFilter={timeFilter}
          onFilterChange={setTimeFilter}
        />

        {/* Charts and List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Chart */}
          <InsightsCarousel expenses={filteredExpenses} />

          {/* Expense List */}
          <ExpenseList
            expenses={filteredExpenses}
            onDelete={handleDeleteExpense}
          />
        </div>
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddExpense}
      />
    </div>
  );
}
