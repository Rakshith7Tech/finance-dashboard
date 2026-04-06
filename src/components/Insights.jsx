function Insights({data}) {
  const expenses = data.filter(t => t.type === "expense");

  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);

  const categoryMap = {};

  expenses.forEach(t => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  });

  let highestCategory = "";
  let highestAmount = 0;

  for (let key in categoryMap) {
    if (categoryMap[key] > highestAmount) {
      highestAmount = categoryMap[key];
      highestCategory = key;
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">

      <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-2xl shadow hover:shadow-md transition">
        <h3 className="text-gray-500 text-sm dark:text-gray-400">Top Spending</h3>
        <p className="font-bold text-lg mt-2 dark:text-white">
          {highestCategory || "N/A"}
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-2xl shadow hover:shadow-md transition">
        <h3 className="text-gray-500 text-sm dark:text-gray-400">Total Expenses</h3>
        <p className="font-bold text-lg mt-2 text-red-600 dark:text-red-400">
          ₹{totalExpense.toLocaleString()}
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-2xl shadow hover:shadow-md transition">
        <h3 className="text-gray-500 text-sm dark:text-gray-400">Insight</h3>
        <p className="text-sm dark:text-gray-300 mt-2">
          {highestCategory
            ? `You are spending the most on ${highestCategory}.`
            : "No data available"}
        </p>
      </div>

    </div>
  );
}

export default Insights;