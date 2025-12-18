import { FiUser, FiSearch, FiBell, FiMessageSquare, FiDollarSign, FiShoppingBag, FiTrendingUp, FiActivity,FiBox,FiShoppingCart } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { UsersContext } from "../context/userContext";
import { ProductContext } from "../context/productContext";
import { useNavigate } from 'react-router-dom';
import { OrderContext } from "../context/orderContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

function AdminPanel() {

  const {userList,userCount,orderCount}=useContext(UsersContext);
  const {totalProducts}=useContext(ProductContext)
  const {order,revenue,revenueData,topProducts,formatDate}=useContext(OrderContext)
  const navigate=useNavigate()


  const COLORS = {
  Processing: "#f97316", // orange
  Shipped: "#3b82f6",    // blue
  Delivered: "#22c55e",  // green
  Canceled: "#ef4444",   // red
};


  const processingCount = order.filter(o => o.status === "Processing").length;
  const shippedCount = order.filter(o => o.status === "Shipped").length;
  const deliveredCount = order.filter(o => o.status === "Delivered").length;
  const canceledCount = order.filter(o => o.status === "Cancelled").length;

  const statusData = [
  { status: "Processing", value: processingCount },
  { status: "Shipped", value: shippedCount },
  { status: "Delivered", value: deliveredCount },
  { status: "Canceled", value: canceledCount },
];
 

  const stats = [
    { title: 'Total Revenue', value:revenue , change: '+12%', icon: <FaRupeeSign size={24} />, color: 'bg-green-500',link: '/admin' },
    { title: 'Total Users', value:userCount , change: '+12%', icon: <FiUser size={24} />, color: 'bg-blue-500', link: '/admin/users' },
    { title: 'Total Products', value:totalProducts || 0, change: '+5%', icon: <FiBox size={24} />, color: 'bg-purple-500',link: '/admin/products' },
    { title: 'Total Orders', value:orderCount, change: '+8%', icon: <FiShoppingCart size={24} />, color: 'bg-orange-400',link: '/admin/orders' }
  ];

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-5">
      <main className={`transition-all duration-300`}>
        <nav className="flex flex-wrap justify-between items-center bg-white/70 rounded-2xl p-6 backdrop-blur-lg shadow-sm mb-5">
            <div className="mb-3 sm:mb-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600">Welcome back, Admin!</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {/* <div className="relative flex-1 sm:flex-none">
                <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
                <input 
                  type="text" 
                  className="w-full sm:w-64 bg-white rounded-2xl pl-10 pr-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all" 
                  placeholder="Search..." 
                />
              </div> */}
              {/* <button className="relative p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                <FiBell size={18} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </button> */}
              <div className="flex items-center gap-2 bg-white rounded-xl pl-2 pr-3 py-1.5 border border-gray-200">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
          {stats.map((stat, index) => (
            <div key={index} onClick={()=> navigate(stat.link)} className="bg-white/70 backdrop-blur-lg rounded-2xl p-5 border border-white/30 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-15 text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>




         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Revenue Over Time */}
  <div className="bg-gradient-to-br from-white/80 to-black/10 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-white/20">
    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
      <FaRupeeSign/>Revenue Over Time
    </h2>

    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={revenueData}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6b7280" }} />
        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
          }}
          labelStyle={{ color: "#374151", fontWeight: "600" }}
        />
        
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="url(#revenueGradient)"
          strokeWidth={3}
          dot={{ r: 4, fill: "#22c55e", strokeWidth: 1, stroke: "#fff" }}
          activeDot={{ r: 6, fill: "#16a34a" }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>


          <div className="bg-gradient-to-br from-white/80 to-black/20 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-white/20">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        🛒 Orders by Status
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false} // hide connector lines
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
                const radius = innerRadius + (outerRadius - innerRadius) / 2;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                return (
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={14}
                    fontWeight="600"
                  >
                    {value}
                  </text>
                );
              }}
            >
              {statusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.status]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} orders`, name]}
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value) => (
                <span className="text-gray-700 font-medium">{value}</span>
              )}
            />
        </PieChart>
      </ResponsiveContainer>
    </div>
    </div>




    <div className="bg-gradient-to-br from-white/80 to-black/20 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-white/20 overflow-x-auto mt-10">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h2>
  
  <div className="min-w-[800px]">
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={topProducts}
        width={Math.max(topProducts.length * 90, 800)} // dynamic width
        height={320}
      >
        <defs>
          {/* Gradient for bars */}
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} /> {/* Blue-500 */}
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.9} /> {/* Purple-500 */}
        </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="name"
          interval={0}
          angle={-25}
          textAnchor="end"
          tick={{ fontSize: 12, fill: "#6b7280" }}
        />
        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          itemStyle={{ color: "#111827", fontWeight: 500 }}
          formatter={(value) => [`${value} orders`, "Orders"]}
        />
        <Legend />

        <Bar
          dataKey="orders"
          fill="url(#barGradient)"
          radius={[12, 12, 0, 0]} // rounded top corners
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
  <div className="bg-gradient-to-br from-white/80 to-black/20 backdrop-blur-xl shadow-xl rounded-2xl p-4">
  <h2 className="font-bold mb-4 text-lg">Recent Users</h2>
  <div className="overflow-x-auto">
    <table className="w-full border-collapse rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-left">
          <th className="p-3">ID</th>
          <th className="p-3">Name</th>
          <th className="p-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {userList.filter(u=>u.role==="user")
                .slice(-5)
                .map((u) => (
          <tr
            key={u.id}
            className="border-b last:border-none hover:bg-gray-50 transition text-start"
          >
            <td className="p-3">#{u.id}</td>
            <td className="p-3">{u.name}</td>
            <td className="p-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  u.status === "active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {u.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
<div className="bg-gradient-to-br from-white/80 to-black/30 backdrop-blur-xl shadow-xl rounded-2xl p-4 md:p-6 overflow-x-auto">
  <h2 className="text-lg font-bold mb-4 text-gray-800">Recent Orders</h2>
  <table className="w-full  border-collapse">
    <thead>
      <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm">
        <th className="p-3 rounded-tl-xl">Order ID</th>
        <th className="p-3">User</th>
        <th className="p-3">Amount</th>
        <th className="p-3">Status</th>
        <th className="p-3 rounded-tr-xl">Date</th>
      </tr>
    </thead>
    <tbody>
      {order.filter(o=>o.status!=="Cancelled")
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0,5).map(order => (
        <tr
          key={order.order_id}
          className="border-b hover:bg-gray-50 transition-colors"
        >
          <td className="p-3 text-gray-800 font-medium">{order.order_id}</td>
          <td className="p-3">{order.user}</td>
          <td className="p-3 font-semibold text-gray-900">
            ₹{order.amount.toLocaleString("en-IN")}
          </td>
          <td className="p-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold
                ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Processing"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "Cancel"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-600"
                }`}
            >
              {order.status}
            </span>
          </td>
          <td className="p-3 text-gray-600">{formatDate(order.date)}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

</div>






        
      </main>
    </div>
  );
}

export default AdminPanel;