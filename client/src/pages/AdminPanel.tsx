import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Users,
  UserPlus,
  Settings,
  Search,
  Filter,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Crown,
  Activity,
  MessageSquare,
  PenTool,
  Eye,
  EyeOff,
  Save,
  Plus,
  AlertTriangle,
  Sparkles,
  Zap,
  Database,
  BarChart3,
  Menu,
  X
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  permissions: {
    canCreateBlog: boolean;
    canSendMessage: boolean;
    canReplyMessage: boolean;
  };
  joinDate: string;
  lastActive: string;
  blogCount: number;
  messageCount: number;
}

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'permissions' | 'settings'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileUserDetail, setShowMobileUserDetail] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user' as 'user' | 'admin',
    permissions: {
      canCreateBlog: true,
      canSendMessage: true,
      canReplyMessage: true
    }
  });

  // Mock data
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      permissions: { canCreateBlog: true, canSendMessage: true, canReplyMessage: true },
      joinDate: '2024-01-10',
      lastActive: '2024-01-15 14:30',
      blogCount: 5,
      messageCount: 12
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
      permissions: { canCreateBlog: false, canSendMessage: true, canReplyMessage: true },
      joinDate: '2024-01-08',
      lastActive: '2024-01-14 09:15',
      blogCount: 0,
      messageCount: 8
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'admin',
      status: 'active',
      permissions: { canCreateBlog: true, canSendMessage: true, canReplyMessage: true },
      joinDate: '2024-01-05',
      lastActive: '2024-01-15 16:45',
      blogCount: 15,
      messageCount: 25
    }
  ]);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    adminUsers: users.filter(u => u.role === 'admin').length,
    totalBlogs: users.reduce((sum, user) => sum + user.blogCount, 0),
    totalMessages: users.reduce((sum, user) => sum + user.messageCount, 0)
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user: User = {
        id: Date.now().toString(),
        ...newUser,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString(),
        blogCount: 0,
        messageCount: 0
      };
      setUsers([...users, user]);
      setNewUser({
        name: '',
        email: '',
        role: 'user',
        permissions: { canCreateBlog: true, canSendMessage: true, canReplyMessage: true }
      });
      setShowAddUser(false);
    }
  };

  const handleUpdatePermissions = (userId: string, permissions: User['permissions']) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, permissions } : user
    ));
  };

  const handleStatusChange = (userId: string, status: User['status']) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status } : user
    ));
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setShowMobileUserDetail(true);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-5rem)] py-4 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">


          <div className="text-center flex-1">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-600/10 border border-purple-500/20 rounded-full mb-4">
              <Crown className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-purple-400 text-sm font-medium">Admin Control</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              Admin
              <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-lg px-4">Manage users, permissions, and platform settings</p>
          </div>

          <div className="w-16 sm:w-32"></div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl text-white"
          >
            <div className="flex items-center space-x-3">
              {activeTab === 'dashboard' && <BarChart3 className="w-5 h-5 text-purple-400" />}
              {activeTab === 'users' && <Users className="w-5 h-5 text-purple-400" />}
              {activeTab === 'permissions' && <Shield className="w-5 h-5 text-purple-400" />}
              {activeTab === 'settings' && <Settings className="w-5 h-5 text-purple-400" />}
              <span className="font-medium capitalize">
                {activeTab === 'users' ? 'User Management' :
                  activeTab === 'permissions' ? 'Permissions' : activeTab}
              </span>
            </div>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block mb-8`}>
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 lg:bg-slate-800/50 lg:backdrop-blur-xl lg:border lg:border-slate-700/50 lg:rounded-2xl lg:p-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'permissions', label: 'Permissions', icon: Shield },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id as any);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-center lg:justify-start space-x-2 px-6 py-4 lg:py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === id
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-white border border-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50 bg-slate-800/30 lg:bg-transparent border border-slate-700/30 lg:border-transparent'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm lg:text-base">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile User Detail Modal */}
        {showMobileUserDetail && selectedUser && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileUserDetail(false)}></div>
            <div className="absolute inset-x-4 top-4 bottom-4 bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">User Details</h4>
                <button
                  onClick={() => setShowMobileUserDetail(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedUser.role === 'admin'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    }`}>
                    {selectedUser.role === 'admin' ? (
                      <Crown className="w-6 h-6 text-white" />
                    ) : (
                      <Users className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">{selectedUser.name}</p>
                    <p className="text-slate-400">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Role:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedUser.role === 'admin'
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                      {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedUser.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      selectedUser.status === 'inactive' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                      {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Join Date:</span>
                    <span className="text-white">{selectedUser.joinDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Activity:</span>
                    <span className="text-white text-sm">{selectedUser.blogCount} blogs, {selectedUser.messageCount} messages</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-white font-semibold">Permissions</h5>
                  {[
                    { key: 'canCreateBlog', label: 'Create Blog Posts', icon: PenTool },
                    { key: 'canSendMessage', label: 'Send Messages', icon: MessageSquare },
                    { key: 'canReplyMessage', label: 'Reply to Messages', icon: MessageSquare }
                  ].map(({ key, label, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span className="text-white text-sm">{label}</span>
                      </div>
                      <button
                        onClick={() => handleUpdatePermissions(selectedUser.id, {
                          ...selectedUser.permissions,
                          [key]: !selectedUser.permissions[key as keyof typeof selectedUser.permissions]
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${selectedUser.permissions[key as keyof typeof selectedUser.permissions]
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : 'bg-slate-600'
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${selectedUser.permissions[key as keyof typeof selectedUser.permissions] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => handleStatusChange(selectedUser.id, selectedUser.status === 'active' ? 'suspended' : 'active')}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 font-medium rounded-lg transition-all duration-200"
                >
                  {selectedUser.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="text-sm">{selectedUser.status === 'active' ? 'Suspend' : 'Activate'}</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium rounded-lg transition-all duration-200">
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Delete</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {[
                { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'blue' },
                { label: 'Active Users', value: stats.activeUsers, icon: Activity, color: 'green' },
                { label: 'Admins', value: stats.adminUsers, icon: Crown, color: 'purple' },
                { label: 'Total Blogs', value: stats.totalBlogs, icon: PenTool, color: 'orange' },
                { label: 'Messages', value: stats.totalMessages, icon: MessageSquare, color: 'cyan' }
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-slate-800/70 transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-r ${color === 'blue' ? 'from-blue-500/5 to-cyan-500/5' :
                    color === 'green' ? 'from-green-500/5 to-emerald-500/5' :
                      color === 'purple' ? 'from-purple-500/5 to-pink-500/5' :
                        color === 'orange' ? 'from-orange-500/5 to-red-500/5' :
                          'from-cyan-500/5 to-blue-500/5'
                    } rounded-xl sm:rounded-2xl`}></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${color === 'blue' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20' :
                        color === 'green' ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20' :
                          color === 'purple' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20' :
                            color === 'orange' ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20' :
                              'bg-gradient-to-r from-cyan-500/20 to-blue-500/20'
                        }`}>
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color === 'blue' ? 'text-blue-400' :
                          color === 'green' ? 'text-green-400' :
                            color === 'purple' ? 'text-purple-400' :
                              color === 'orange' ? 'text-orange-400' :
                                'text-cyan-400'
                          }`} />
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm font-medium mb-1">{label}</p>
                    <p className="text-white text-xl sm:text-2xl font-bold">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-400" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {users.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${user.role === 'admin'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                        }`}>
                        {user.role === 'admin' ? (
                          <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        ) : (
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-medium text-sm sm:text-base truncate">{user.name}</p>
                        <p className="text-slate-400 text-xs sm:text-sm truncate">Last active: {user.lastActive}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-slate-300 text-xs sm:text-sm">{user.blogCount} blogs</p>
                      <p className="text-slate-400 text-xs">{user.messageCount} messages</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-400" />
                  User Management
                </h3>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full sm:w-auto bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                    />
                  </div>
                  <button
                    onClick={() => setShowAddUser(true)}
                    className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-4 px-6 text-slate-300 font-semibold">User</th>
                      <th className="text-left py-4 px-6 text-slate-300 font-semibold">Role</th>
                      <th className="text-left py-4 px-6 text-slate-300 font-semibold">Status</th>
                      <th className="text-left py-4 px-6 text-slate-300 font-semibold">Activity</th>
                      <th className="text-left py-4 px-6 text-slate-300 font-semibold">Join Date</th>
                      <th className="text-left py-4 px-6 text-slate-300 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors duration-200">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user.role === 'admin'
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                              }`}>
                              {user.role === 'admin' ? (
                                <Crown className="w-5 h-5 text-white" />
                              ) : (
                                <Users className="w-5 h-5 text-white" />
                              )}
                            </div>
                            <div>
                              <p className="text-white font-medium">{user.name}</p>
                              <p className="text-slate-400 text-sm">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            user.status === 'inactive' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                              'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-slate-300 text-sm">
                            <p>{user.blogCount} blogs</p>
                            <p>{user.messageCount} messages</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-300">{user.joinDate}</td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'suspended' : 'active')}
                              className="p-2 text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all duration-200"
                            >
                              {user.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="bg-slate-700/30 border border-slate-600/30 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${user.role === 'admin'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                          }`}>
                          {user.role === 'admin' ? (
                            <Crown className="w-5 h-5 text-white" />
                          ) : (
                            <Users className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-medium text-sm truncate">{user.name}</p>
                          <p className="text-slate-400 text-xs truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          user.status === 'inactive' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                      <span>Joined: {user.joinDate}</span>
                      <span>{user.blogCount} blogs, {user.messageCount} messages</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUserSelect(user)}
                        className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span className="text-sm">Edit</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'suspended' : 'active')}
                        className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all duration-200"
                      >
                        {user.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        <span className="text-sm">{user.status === 'active' ? 'Suspend' : 'Activate'}</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200">
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-400" />
              Permission Management
            </h3>

            <div className="space-y-4 sm:space-y-6">
              {users.map((user) => (
                <div key={user.id} className="bg-slate-700/30 rounded-xl p-4 sm:p-6 border border-slate-600/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${user.role === 'admin'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                        }`}>
                        {user.role === 'admin' ? (
                          <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        ) : (
                          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-base sm:text-lg">{user.name}</p>
                        <p className="text-slate-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                    <span className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium self-start sm:self-center ${user.role === 'admin'
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    {[
                      { key: 'canCreateBlog', label: 'Create Blog Posts', icon: PenTool },
                      { key: 'canSendMessage', label: 'Send Messages', icon: MessageSquare },
                      { key: 'canReplyMessage', label: 'Reply to Messages', icon: MessageSquare }
                    ].map(({ key, label, icon: Icon }) => (
                      <div key={key} className="flex items-center justify-between p-3 sm:p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                          <span className="text-white font-medium text-sm sm:text-base">{label}</span>
                        </div>
                        <button
                          onClick={() => handleUpdatePermissions(user.id, {
                            ...user.permissions,
                            [key]: !user.permissions[key as keyof typeof user.permissions]
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${user.permissions[key as keyof typeof user.permissions]
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : 'bg-slate-600'
                            }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${user.permissions[key as keyof typeof user.permissions] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-400" />
              Platform Settings
            </h3>

            <div className="space-y-6 sm:space-y-8">
              <div className="bg-slate-700/30 rounded-xl p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400" />
                  System Configuration
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Max Blog Word Count</label>
                    <input
                      type="number"
                      defaultValue="300"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Auto-approve Blogs</label>
                    <select className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200">
                      <option>Require Approval</option>
                      <option>Auto-approve</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-xl p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                  Security Settings
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">Two-Factor Authentication</p>
                      <p className="text-slate-400 text-xs sm:text-sm">Require 2FA for admin accounts</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">Login Attempt Limit</p>
                      <p className="text-slate-400 text-xs sm:text-sm">Maximum failed login attempts</p>
                    </div>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-16 sm:w-20 px-2 sm:px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white text-center focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]">
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Save Settings</span>
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 opacity-70" />
              </button>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-400" />
                Add New User
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'user' | 'admin' })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Permissions</label>
                  <div className="space-y-3">
                    {[
                      { key: 'canCreateBlog', label: 'Create Blog Posts' },
                      { key: 'canSendMessage', label: 'Send Messages' },
                      { key: 'canReplyMessage', label: 'Reply to Messages' }
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm">{label}</span>
                        <button
                          onClick={() => setNewUser({
                            ...newUser,
                            permissions: {
                              ...newUser.permissions,
                              [key]: !newUser.permissions[key as keyof typeof newUser.permissions]
                            }
                          })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${newUser.permissions[key as keyof typeof newUser.permissions]
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : 'bg-slate-600'
                            }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${newUser.permissions[key as keyof typeof newUser.permissions] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
                <button
                  onClick={() => setShowAddUser(false)}
                  className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;