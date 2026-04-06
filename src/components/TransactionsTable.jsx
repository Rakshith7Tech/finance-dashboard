import { useState } from "react";

function TransactionsTable({role, data, setData}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    category: "",
    amount: "",
    type: "expense",
  });

  const filteredData = data
    .filter((t) => {
      if (filter === "all") return true;
      return t.type === filter;
    })
    .filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleAdd = () => {
  if (!newTransaction.date || !newTransaction.category || !newTransaction.amount || newTransaction.amount <= 0) {
    return;
  }

  const newData = {
    ...newTransaction,
    id: Date.now(),
    amount: Number(newTransaction.amount),
  };

  setData([newData, ...data]);

  setNewTransaction({
    date: "",
    category: "",
    amount: "",
    type: "expense",
  });
};

    const handleDelete = (id) => {
        setData(data.filter((t) => t.id !== id));
    };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        
        <input
          type="text"
          placeholder="Search by category..."
          className="border p-2 rounded-lg w-full md:w-1/2 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg w-full md:w-1/4 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {role === "admin" && (
  <div className="mb-4 grid md:grid-cols-5 gap-2">

    <input
      type="date"
      className="border p-2 rounded-lg bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
      value={newTransaction.date}
      onChange={(e) =>
        setNewTransaction({ ...newTransaction, date: e.target.value })
      }
    />

    <input
      type="text"
      placeholder="Category"
      className="border p-2 rounded-lg bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
      value={newTransaction.category}
      onChange={(e) =>
        setNewTransaction({ ...newTransaction, category: e.target.value })
      }
    />

    <input
      type="number"
      placeholder="Amount"
      min="0"
      className="border p-2 rounded-lg bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
      value={newTransaction.amount}
      onChange={(e) =>
        setNewTransaction({ ...newTransaction, amount: Math.max(0, e.target.value) })
      }
    />

    <select
      className="border p-2 rounded-lg bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
      value={newTransaction.type}
      onChange={(e) =>
        setNewTransaction({ ...newTransaction, type: e.target.value })
      }
    >
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>

    <button
      onClick={handleAdd}
      disabled={!newTransaction.date || !newTransaction.category || !newTransaction.amount}
      className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      Add
    </button>

  </div>
)}

      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="border-b border-gray-200 dark:border-gray-700 transition">
              <th className="p-3 font-medium dark:text-gray-200">Date</th>
              <th className="p-3 font-medium dark:text-gray-200">Category</th>
              <th className="p-3 font-medium dark:text-gray-200">Type</th>
              <th className="p-3 font-medium dark:text-gray-200">Amount</th>

              {role === "admin" && <th className="p-3 dark:text-gray-200">Action</th>}
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 dark:text-gray-400">
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredData.map((t) => (
                <tr key={t.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-3 dark:text-gray-200">{t.date}</td>
                  <td className="p-3 dark:text-gray-200">{t.category}</td>
                  <td className="p-3 dark:text-gray-200 capitalize">{t.type}</td>
                  <td
                    className={`p-3 font-semibold ${
                      t.type === "income"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    ₹{t.amount}
                  </td>
                  {role === "admin" && (
                    <td className="p-3">
                        <button
                            onClick={() => handleDelete(t.id)}
                            className="text-red-500 hover:underline dark:text-red-400"
                        >
                            Delete
                        </button>
                    </td>
                    )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsTable;