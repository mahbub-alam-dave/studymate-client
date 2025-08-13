import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Users, BookOpen, UserPlus, Trophy, TrendingUp, Calendar, Award, Target } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { PiStudent } from "react-icons/pi";
import { Link, useNavigate } from 'react-router';

// Demo data - replace with actual data later
const demoStats = {
  totalUsers: 12547,
  totalAssignments: 3829,
  totalPublishers: 234,
  totalParticipants: 8932,
  activeToday: 1456,
  completionRate: 87.5
};

// Chart data
const monthlyGrowthData = [
  { month: 'Jan', users: 1200, assignments: 340 },
  { month: 'Feb', users: 2100, assignments: 520 },
  { month: 'Mar', users: 3400, assignments: 780 },
  { month: 'Apr', users: 4800, assignments: 1100 },
  { month: 'May', users: 6500, assignments: 1580 },
  { month: 'Jun', users: 8200, assignments: 2200 },
  { month: 'Jul', users: 10100, assignments: 2850 },
  { month: 'Aug', users: 12547, assignments: 3829 }
];

const assignmentStatusData = [
  { name: 'Completed', value: 2890, color: '#10B981' },
  { name: 'In Progress', value: 654, color: '#3B82F6' },
  { name: 'Pending', value: 285, color: '#F59E0B' }
];

const subjectDistribution = [
  { subject: 'Math', assignments: 890 },
  { subject: 'Science', assignments: 756 },
  { subject: 'English', assignments: 623 },
  { subject: 'History', assignments: 445 },
  { subject: 'Programming', assignments: 567 },
  { subject: 'Physics', assignments: 548 }
];

const Overview = () => {
    const navigate = useNavigate()
  return (
    <div className="w-full py-8">
      <div className="w-full">
        {/* Header Section */}
        <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-2xl p-8 mb-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] p-3 rounded-full">
                <PiStudent className="h-12 w-12 text-[var(--color-text-primary-dark)]" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] mb-4">
              Edumate Dashboard
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] max-w-2xl mx-auto leading-relaxed">
              Welcome to your comprehensive learning platform! Track progress, manage assignments, 
              and connect with fellow learners in our collaborative study environment.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <TrendingUp className="inline h-4 w-4 mr-1" />
                Growing Fast
              </div>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <Award className="inline h-4 w-4 mr-1" />
                Top Rated
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-xl p-8 border-l-4 border-blue-500 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-1">Total Users</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">{demoStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +12% this month
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Assignments */}
          <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-xl p-8 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-1">Total Assignments</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">{demoStats.totalAssignments.toLocaleString()}</p>
                <p className="text-sm text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +18% this month
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-300 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]" />
              </div>
            </div>
          </div>

          {/* Total Publishers */}
          <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-xl p-8 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-1">Publishers</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">{demoStats.totalPublishers.toLocaleString()}</p>
                <p className="text-sm text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +8% this month
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-300 p-3 rounded-full">
                <UserPlus className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Total Participants */}
          <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-xl p-8 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-1">Participants</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">{demoStats.totalParticipants.toLocaleString()}</p>
                <p className="text-sm text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +15% this month
                </p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-300 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-1">Active Today</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">{demoStats.activeToday.toLocaleString()}</p>
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-300 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-1">Completion Rate</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">{demoStats.completionRate}%</p>
              </div>
              <div className="bg-cyan-100 dark:bg-cyan-300 p-2 rounded-full">
                <Target className="h-5 w-5 text-cyan-600" />
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-1">Success Score</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">9.2/10</p>
              </div>
              <div className="bg-pink-100 dark:bg-pink-300 p-2 rounded-full">
                <Award className="h-5 w-5 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Growth Chart */}
          <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] mb-4">Growth Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f9fafb', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  name="Users"
                />
                <Line 
                  type="monotone" 
                  dataKey="assignments" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  name="Assignments"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Assignment Status Pie Chart */}
          <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] mb-4">Assignment Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assignmentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {assignmentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value.toLocaleString(), 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Distribution Chart */}
        <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] mb-4">Popular Subjects</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="subject" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f9fafb', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }} 
                formatter={(value) => [value.toLocaleString(), 'Assignments']}
              />
              <Bar 
                dataKey="assignments" 
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-xl p-6">
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button onClick={() => navigate('/')} className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 text-[var(--color-text-primary-dark)] p-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105">
              <PiStudent className="h-8 w-8 mx-auto mb-2" />
              <span className="text-base f font-medium">Go Home</span>
            </button>
                        <button onClick={() => navigate('/dashboard/profile')} className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-[var(--color-text-primary-dark)] p-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <span className="text-base fm font-medium">Go To Profile</span>
            </button>
            <button onClick={() => navigate('/dashboard/create-assignment')} className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-[var(--color-text-primary-dark)] p-8 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
              <BookOpen className="h-8 w-8 mx-auto mb-2" />
              <span className="text-base font-medium">Create Assignment</span>
            </button>
            <button onClick={() => navigate('/dashboard/my-bookmarked-assignments')} className="cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 text-[var(--color-text-primary-dark)] p-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105">
              <Bookmark className="h-8 w-8 mx-auto mb-2" />
              <span className="text-base font-medium">My Bookmark</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
          <p>© 2025 Study Mate. Empowering learners worldwide.</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;