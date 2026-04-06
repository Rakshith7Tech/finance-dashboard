import { useState, useEffect } from 'react'
import { Sun, Moon } from "lucide-react";
import './App.css'
import TransactionsTable from './components/TransactionsTable.jsx'
import Charts from './components/Charts.jsx'
import Insights from './components/Insights.jsx'
import { transactions as initialData } from "./data/sampleData.js";

function App() {
  const [role, setRole] = useState("viewer");
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : initialData;
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setDarkMode(savedTheme === "dark");
  }
}, []);

  const income = data
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = data
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className={darkMode ? "dark" : ""}>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-3 sm:mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">
            Finance Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your income and expenses
          </p>
        </div>

<div className="flex items-center gap-3">
  <button
  onClick={() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  }}
  className="px-3 py-1 my-2 sm:my-0 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
>
  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
</button>
        <select className="border rounded-lg px-3 py-1 bg-white shadow-sm dark:bg-gray-800 dark:text-white"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

{role === "admin" && (
        <button
    onClick={() => {
      if (confirm("Are you sure you want to reset all data?")) {
      localStorage.removeItem("transactions");
      setData(initialData);
      }
    }}
    className="text-sm text-red-500 dark:text-red-400 hover:underline"
  >
    Reset
  </button>
)}
  </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition dark:bg-gray-800">
          <h2 className="text-gray-500 text-sm dark:text-gray-400">Total Balance</h2>
          <p className="text-2xl font-bold mt-2 dark:text-white">₹{balance.toLocaleString()}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition dark:bg-gray-800">
          <h2 className="text-gray-500 text-sm dark:text-gray-400">Income</h2>
          <p className="text-2xl text-green-600 dark:text-green-400 font-bold mt-2">₹{income.toLocaleString()}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition dark:bg-gray-800">
          <h2 className="text-gray-500 text-sm dark:text-gray-400">Expenses</h2>
          <p className="text-2xl text-red-600 dark:text-red-400 font-bold mt-2">₹{expenses.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition mt-6 dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
  Financial Overview
</h2>
        <Charts data={data} darkMode={darkMode}/>
      </div>

      <div className="mt-6 bg-white p-5 rounded-2xl shadow hover:shadow-md transition dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Transactions Table</h2>
        <TransactionsTable role={role} data={data} setData={setData}/>
      </div>

      <div className="mt-6 bg-white p-5 rounded-2xl shadow hover:shadow-md transition dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Insights Section</h2>
        <Insights data={data}/>
      </div>

    </div>
    </div>
  );
}

export default App;
