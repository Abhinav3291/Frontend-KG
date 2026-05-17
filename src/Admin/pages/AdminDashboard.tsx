import { Users, Award, TrendingUp, Calendar } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Certificates', value: '1,248', icon: Award, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Active Students', value: '842', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Recent Downloads', value: '156', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'New Enrollments', value: '48', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Welcome back to the KG Admin Portal.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center p-4 hover:bg-gray-50 rounded-xl transition-colors duration-150">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                {String.fromCharCode(64 + item)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Certificate #{1000 + item} Generated</p>
                <p className="text-xs text-gray-500">For John Doe - Full Stack Web Development</p>
              </div>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
