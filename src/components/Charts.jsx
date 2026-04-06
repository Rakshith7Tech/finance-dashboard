import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

function Charts({data, darkMode}) {

  let balance = 0;
const lineData = data.map((t) => {
  balance += t.type === "income" ? t.amount : -t.amount;
  return { name: t.date, amount: balance };
}); 

  const categoryMap = {};

  data.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      
      <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-2xl shadow hover:shadow-md transition h-72">
        <h2 className="font-semibold mb-2 dark:text-white">Balance Trend</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <XAxis dataKey="name" hide stroke="#9ca3af"/>
            <YAxis stroke="#9ca3af"/>
            <Tooltip 
            contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff", 
                border: darkMode ? "none" : "1px solid #e5e7eb",
                color: darkMode ? "#fff" : "#000",
            }}
            />
            <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-2xl shadow hover:shadow-md transition h-72">
        <h2 className="font-semibold mb-2 dark:text-white">Spending Breakdown</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={90} label>
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
            contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                border: darkMode ? "none" : "1px solid #e5e7eb",
                color: darkMode ? "#fff" : "#000",
            }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Charts;