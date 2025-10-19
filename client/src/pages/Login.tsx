import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Zap } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../store/store';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState<'user' | 'admin' | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    // import the Login Functuonality
    const { loginUser, loginAdmin, error, userToken, isAdmin } = useAuthStore();



    const loading = useAuthStore((state) => state.isLoading);


    const handleRoleSelect = (role: 'user' | 'admin') => {
        setSelectedRole(role);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        if (userToken && isAdmin) {
            navigate('/admin-panel');
        }
        else if (userToken && !isAdmin) {
            navigate('/user-panel');
        }
    }, [userToken])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (selectedRole === 'user') {
                await loginUser(formData.email, formData.password);
            } else if (selectedRole === 'admin') {
                await loginAdmin(formData.email, formData.password);
            }
        } catch (err) {
            console.error('Login error:', err, error);
        }

    };

    if (!selectedRole) {
        return (
            <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-16">
                <div className="max-w-6xl w-full">
                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-full mb-8">
                            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
                            <span className="text-blue-400 text-sm font-medium">Welcome to the Platform</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                            Access Your
                            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                                Dashboard
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Choose your access level to unlock powerful tools for content creation and platform management.
                            Built for the next generation of blockchain applications.
                        </p>
                    </div>

                    {/* Role Selection Cards */}
                    <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* User Access Card */}
                        <div
                            onClick={() => handleRoleSelect('user')}
                            className="group cursor-pointer"
                        >
                            <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 h-full hover:bg-slate-800/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
                                {/* Gradient Border Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <User className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <ArrowRight className="w-6 h-6 text-blue-400" />
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-4">User Access</h3>
                                    <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                                        Perfect for content creators and community members. Create engaging blog posts,
                                        manage your content, and connect with the ecosystem.
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex items-center text-slate-400">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                                            <span>Content Creation Tools</span>
                                        </div>
                                        <div className="flex items-center text-slate-400">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                                            <span>Community Features</span>
                                        </div>
                                        <div className="flex items-center text-slate-400">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                                            <span>Analytics Dashboard</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-700/50">
                                        <div className="flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors duration-300">
                                            <span>Continue as User</span>
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Admin Access Card */}
                        <div
                            onClick={() => handleRoleSelect('admin')}
                            className="group cursor-pointer"
                        >
                            <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 h-full hover:bg-slate-800/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
                                {/* Gradient Border Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Shield className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Zap className="w-6 h-6 text-purple-400" />
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-4">Admin Access</h3>
                                    <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                                        Advanced administrative privileges for platform management. Control user access,
                                        moderate content, and access powerful analytics tools.
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex items-center text-slate-400">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                                            <span>User Management</span>
                                        </div>
                                        <div className="flex items-center text-slate-400">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                                            <span>Content Moderation</span>
                                        </div>
                                        <div className="flex items-center text-slate-400">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                                            <span>Advanced Analytics</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-700/50">
                                        <div className="flex items-center text-purple-400 font-semibold group-hover:text-purple-300 transition-colors duration-300">
                                            <span>Continue as Admin</span>
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-16">
            <div className="max-w-md w-full">
                <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 shadow-2xl">
                    {/* Gradient Background Effect */}
                    <div className={`absolute inset-0 rounded-3xl opacity-10 ${selectedRole === 'admin'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                        }`}></div>

                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${selectedRole === 'admin'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                                : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                                }`}>
                                {selectedRole === 'admin' ? (
                                    <Shield className="w-10 h-10 text-white" />
                                ) : (
                                    <User className="w-10 h-10 text-white" />
                                )}
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-3">
                                {selectedRole === 'admin' ? 'Admin Portal' : 'User Portal'}
                            </h2>


                            <p className="text-slate-400 text-lg">
                                Sign in to access your {selectedRole} dashboard
                            </p>


                            {/*error message */}
                            {
                                error && (
                                    <div className="absolute left-0 right-0 bottom-[-30px] text-red-500 text-sm text-center">
                                        {error}
                                    </div>
                                )
                            }


                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>

                                <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-3">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-3">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-500" />
                                    </div>



                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-12 pr-12 py-4 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                                        placeholder="Enter your password"
                                    />


                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-slate-500 hover:text-slate-400 transition-colors duration-200" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-slate-500 hover:text-slate-400 transition-colors duration-200" />
                                        )}
                                    </button>
                                </div>


                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedRole(null)}
                                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                                >
                                    ← Back to selection
                                </button>
                                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium">
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 px-6 rounded-xl text-white font-semibold transition-all duration-300 ${selectedRole === 'admin'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                                    } ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-lg'}`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <span>Sign In</span>
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </div>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-slate-400 text-sm">
                                Don't have an account?{' '}
                                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium">
                                    Request access
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;