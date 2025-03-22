import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const HOST = import.meta.env.VITE_HOST_URL;


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${HOST}/api/auth/login`, {
                email,
                password,
                is_customer: true,
            });

            localStorage.setItem('token', response.data.token);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const errorMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
                toast.error(errorMsg);
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    }


    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg ">
                <h1 className="text-3xl font-semibold text-center text-[#1a1134]">Welcome to JobForce</h1>
                <p className="text-center text-gray-600">Your career journey starts here.</p>

                <form className="space-y-6" onSubmit={handleLogin}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-[#1a1134] focus:border-[#1a1134]"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-[#1a1134] focus:border-[#1a1134]"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 text-white rounded-lg transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1a1134] hover:bg-[#2a1f44]'
                            }`}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                </div>

                {/* Social Logins */}
                <button
                    className="w-full flex items-center justify-center py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                    </svg>
                    <span className="ml-2">Continue with Google</span>
                </button>

                {/* Links */}
                <div className="flex justify-between text-sm">
                    <button
                        className="text-[#1a1134] font-medium hover:underline"
                        onClick={() => navigate('/register')}
                    >
                        Create Account
                    </button>
                    <button
                        className="text-gray-600 hover:underline"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
