import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PenTool,
    MessageSquare,
    Send,
    Reply,
    Search,
    Filter,
    Calendar,
    Clock,
    User,
    ArrowLeft,
    Plus,
    Eye,
    Edit3,
    Trash2,
    CheckCircle,
    AlertCircle,
    Sparkles,
    FileText,
    Users,
    Activity,
    Menu,
    X
} from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    status: 'published' | 'draft' | 'pending';
    date: string;
    views: number;
    category: string;
}

interface Message {
    id: string;
    sender: string;
    subject: string;
    content: string;
    timestamp: string;
    status: 'read' | 'unread';
    replies: number;
}

const UserPanel: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'dashboard' | 'blogs' | 'messages'>('dashboard');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [replyText, setReplyText] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showMobileMessageDetail, setShowMobileMessageDetail] = useState(false);

    // Mock data
    const [blogPosts] = useState<BlogPost[]>([
        { id: '1', title: 'Understanding DeFi Protocols', status: 'published', date: '2024-01-15', views: 1250, category: 'DeFi' },
        { id: '2', title: 'NFT Market Analysis', status: 'draft', date: '2024-01-14', views: 0, category: 'NFT' },
        { id: '3', title: 'Blockchain Security Best Practices', status: 'pending', date: '2024-01-13', views: 890, category: 'Technical' },
    ]);

    const [messages] = useState<Message[]>([
        { id: '1', sender: 'Admin Team', subject: 'Welcome to Ramestta Platform', content: 'Welcome to our blockchain platform. We are excited to have you as part of our growing community of content creators and blockchain enthusiasts.', timestamp: '2024-01-15 10:30', status: 'read', replies: 2 },
        { id: '2', sender: 'Community Manager', subject: 'New Feature Update', content: 'We have exciting new features coming to the platform that will enhance your content creation experience and engagement with the community.', timestamp: '2024-01-14 15:45', status: 'unread', replies: 0 },
        { id: '3', sender: 'Support Team', subject: 'Blog Post Approval', content: 'Your recent blog post has been reviewed and approved for publication. It will be live on the platform within the next hour.', timestamp: '2024-01-13 09:15', status: 'read', replies: 1 },
    ]);

    const stats = {
        totalBlogs: blogPosts.length,
        publishedBlogs: blogPosts.filter(b => b.status === 'published').length,
        totalViews: blogPosts.reduce((sum, blog) => sum + blog.views, 0),
        unreadMessages: messages.filter(m => m.status === 'unread').length
    };

    const handleReply = (messageId: string) => {
        if (replyText.trim()) {
            console.log('Replying to message:', messageId, 'with:', replyText);
            setReplyText('');
            setSelectedMessage(null);
            setShowMobileMessageDetail(false);
        }
    };

    const handleMessageSelect = (message: Message) => {
        setSelectedMessage(message);
        setShowMobileMessageDetail(true);
    };

    const filteredMessages = messages.filter(message =>
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.sender.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-[calc(100vh-5rem)] py-4 sm:py-8 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 sm:mb-12">
                    <div className="text-center flex-1">
                        <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-full mb-4">
                            <User className="w-4 h-4 text-blue-400 mr-2" />
                            <span className="text-blue-400 text-sm font-medium">User Dashboard</span>
                        </div>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                            Welcome Back,
                            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                                Content Creator
                            </span>
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-lg px-4">Manage your content and engage with the community</p>
                    </div>
                </div>

                {/* Mobile Navigation Toggle */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-full flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl text-white"
                    >
                        <div className="flex items-center space-x-3">
                            {activeTab === 'dashboard' && <Activity className="w-5 h-5 text-blue-400" />}
                            {activeTab === 'blogs' && <PenTool className="w-5 h-5 text-blue-400" />}
                            {activeTab === 'messages' && <MessageSquare className="w-5 h-5 text-blue-400" />}
                            <span className="font-medium capitalize">{activeTab}</span>
                        </div>
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Navigation Tabs */}
                <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block mb-8`}>
                    <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2 lg:bg-slate-800/50 lg:backdrop-blur-xl lg:border lg:border-slate-700/50 lg:rounded-2xl lg:p-2">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: Activity },
                            { id: 'blogs', label: 'My Blogs', icon: PenTool },
                            { id: 'messages', label: 'Messages', icon: MessageSquare }
                        ].map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => {
                                    setActiveTab(id as any);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`flex items-center justify-center lg:justify-start space-x-2 px-6 py-4 lg:py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === id
                                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-blue-500/30'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50 bg-slate-800/30 lg:bg-transparent border border-slate-700/30 lg:border-transparent'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                                {id === 'messages' && stats.unreadMessages > 0 && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto lg:ml-0">
                                        {stats.unreadMessages}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-6 sm:space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {[
                                { label: 'Total Blogs', value: stats.totalBlogs, icon: FileText, color: 'blue' },
                                { label: 'Published', value: stats.publishedBlogs, icon: CheckCircle, color: 'green' },
                                { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'purple' },
                                { label: 'Unread Messages', value: stats.unreadMessages, icon: MessageSquare, color: 'orange' }
                            ].map(({ label, value, icon: Icon, color }) => (
                                <div key={label} className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-slate-800/70 transition-all duration-300">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${color === 'blue' ? 'from-blue-500/5 to-cyan-500/5' :
                                        color === 'green' ? 'from-green-500/5 to-emerald-500/5' :
                                            color === 'purple' ? 'from-purple-500/5 to-pink-500/5' :
                                                'from-orange-500/5 to-red-500/5'
                                        } rounded-xl sm:rounded-2xl`}></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${color === 'blue' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20' :
                                                color === 'green' ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20' :
                                                    color === 'purple' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20' :
                                                        'bg-gradient-to-r from-orange-500/20 to-red-500/20'
                                                }`}>
                                                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color === 'blue' ? 'text-blue-400' :
                                                    color === 'green' ? 'text-green-400' :
                                                        color === 'purple' ? 'text-purple-400' :
                                                            'text-orange-400'
                                                    }`} />
                                            </div>
                                        </div>
                                        <p className="text-slate-400 text-xs sm:text-sm font-medium mb-1">{label}</p>
                                        <p className="text-white text-xl sm:text-2xl font-bold">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-blue-400" />
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <button
                                    onClick={() => navigate('/blog-post')}
                                    className="flex items-center space-x-4 p-4 sm:p-6 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-xl hover:from-blue-500/20 hover:to-purple-600/20 transition-all duration-300 group"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-white font-semibold">Create New Blog</p>
                                        <p className="text-slate-400 text-sm">Share your insights with the community</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveTab('messages')}
                                    className="flex items-center space-x-4 p-4 sm:p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 group"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-white font-semibold">Check Messages</p>
                                        <p className="text-slate-400 text-sm">Stay connected with the team</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Blogs Tab */}
                {activeTab === 'blogs' && (
                    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                                <PenTool className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-blue-400" />
                                My Blog Posts
                            </h3>
                            <button
                                onClick={() => navigate('/blog-post')}
                                className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                            >
                                <Plus className="w-4 h-4" />
                                <span>New Blog</span>
                            </button>
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-700/50">
                                        <th className="text-left py-4 px-6 text-slate-300 font-semibold">Title</th>
                                        <th className="text-left py-4 px-6 text-slate-300 font-semibold">Status</th>
                                        <th className="text-left py-4 px-6 text-slate-300 font-semibold">Category</th>
                                        <th className="text-left py-4 px-6 text-slate-300 font-semibold">Views</th>
                                        <th className="text-left py-4 px-6 text-slate-300 font-semibold">Date</th>
                                        <th className="text-left py-4 px-6 text-slate-300 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogPosts.map((blog) => (
                                        <tr key={blog.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors duration-200">
                                            <td className="py-4 px-6">
                                                <p className="text-white font-medium">{blog.title}</p>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${blog.status === 'published' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                    blog.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                    }`}>
                                                    {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-slate-300">{blog.category}</td>
                                            <td className="py-4 px-6 text-slate-300">{blog.views.toLocaleString()}</td>
                                            <td className="py-4 px-6 text-slate-300">{blog.date}</td>
                                            <td className="py-4 px-6">
                                                <div className="flex space-x-2">
                                                    <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200">
                                                        <Edit3 className="w-4 h-4" />
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
                            {blogPosts.map((blog) => (
                                <div key={blog.id} className="bg-slate-700/30 border border-slate-600/30 rounded-xl p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <h4 className="text-white font-medium text-sm leading-tight flex-1 mr-3">{blog.title}</h4>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${blog.status === 'published' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                            blog.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                                'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                            }`}>
                                            {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                                        <span>{blog.category}</span>
                                        <span>{blog.views.toLocaleString()} views</span>
                                        <span>{blog.date}</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200">
                                            <Eye className="w-4 h-4" />
                                            <span className="text-sm">View</span>
                                        </button>
                                        <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200">
                                            <Edit3 className="w-4 h-4" />
                                            <span className="text-sm">Edit</span>
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
                )}

                {/* Messages Tab */}
                {activeTab === 'messages' && (
                    <div className="space-y-6">
                        {/* Mobile Message Detail Modal */}
                        {showMobileMessageDetail && selectedMessage && (
                            <div className="fixed inset-0 z-50 lg:hidden">
                                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileMessageDetail(false)}></div>
                                <div className="absolute inset-x-4 top-4 bottom-4 bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col overflow-hidden">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-lg font-bold text-white">Message Details</h4>
                                        <button
                                            onClick={() => setShowMobileMessageDetail(false)}
                                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto">
                                        <h5 className="text-white font-semibold mb-3">{selectedMessage.subject}</h5>
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium text-sm">{selectedMessage.sender}</p>
                                                <p className="text-slate-400 text-xs">{selectedMessage.timestamp}</p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-700/30 rounded-xl p-4 mb-4">
                                            <p className="text-slate-300 text-sm leading-relaxed">{selectedMessage.content}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-sm font-semibold text-slate-300 mb-2">Reply</label>
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Type your reply..."
                                            rows={3}
                                            className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-none text-sm"
                                        />
                                        <button
                                            onClick={() => handleReply(selectedMessage.id)}
                                            disabled={!replyText.trim()}
                                            className="mt-3 w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Send className="w-4 h-4" />
                                            <span>Send Reply</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Messages List */}
                            <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-8">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                                        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-blue-400" />
                                        Messages
                                    </h3>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search messages..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 w-full sm:w-auto bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    {filteredMessages.map((message) => (
                                        <div
                                            key={message.id}
                                            onClick={() => handleMessageSelect(message)}
                                            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${message.status === 'unread'
                                                ? 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20'
                                                : 'bg-slate-700/30 border-slate-600/30 hover:bg-slate-700/50'
                                                } ${selectedMessage?.id === message.id ? 'ring-2 ring-blue-500/50' : ''}`}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center space-x-3 flex-1 min-w-0">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <User className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-white font-medium text-sm truncate">{message.sender}</p>
                                                        <p className="text-slate-400 text-xs">{message.timestamp}</p>
                                                    </div>
                                                </div>
                                                {message.status === 'unread' && (
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0 mt-1"></div>
                                                )}
                                            </div>
                                            <h4 className="text-white font-semibold mb-2 text-sm">{message.subject}</h4>
                                            <p className="text-slate-300 text-sm line-clamp-2">{message.content}</p>
                                            {message.replies > 0 && (
                                                <div className="flex items-center mt-2 text-slate-400 text-xs">
                                                    <Reply className="w-3 h-3 mr-1" />
                                                    {message.replies} replies
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Desktop Message Detail */}
                            <div className="hidden lg:block bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
                                {selectedMessage ? (
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-4">{selectedMessage.subject}</h4>
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{selectedMessage.sender}</p>
                                                <p className="text-slate-400 text-sm">{selectedMessage.timestamp}</p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-700/30 rounded-xl p-4 mb-6">
                                            <p className="text-slate-300 leading-relaxed">{selectedMessage.content}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-300 mb-3">Reply</label>
                                            <textarea
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                placeholder="Type your reply..."
                                                rows={4}
                                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-none"
                                            />
                                            <button
                                                onClick={() => handleReply(selectedMessage.id)}
                                                disabled={!replyText.trim()}
                                                className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Send className="w-4 h-4" />
                                                <span>Send Reply</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                        <p className="text-slate-400">Select a message to view and reply</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPanel;