import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import showCred from '../components/showCred';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const HOST = import.meta.env.VITE_HOST_URL;
    useEffect(() => {
        showCred();
    }, []);

    // Login Handle 
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${HOST}/api/auth/login`, {
                email,
                password,
            });

            if (response.status == 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.user.email);
                toast.success('Login successful!');
                navigate('/home');
            } else {
                console.log(response.data);
                toast.error(response.data.message)
            }
        } catch (err) {
            console.error('Login Error:', err);
            if (axios.isAxiosError(err)) {
                if (!err.response) {
                    toast.error('Network error. Please check your internet connection.');
                } else {
                    // Server responded with an error
                    const errorMsg = err.response.data?.message || 'Login failed. Please check your credentials.';
                    toast.error(errorMsg);
                }
            } else {
                // Non-Axios related error (unexpected error)
                toast.error('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-2">
            <div className="w-full max-w-sm p-4 space-y-4 bg-white rounded-lg ">
                <h1 className="text-xl font-semibold text-center text-[#1a1134]">Welcome to JobForce</h1>
                <p className="text-center text-gray-600 text-xs">Your career journey starts here.</p>

                <form className="space-y-3" onSubmit={handleLogin}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 p-2 text-sm border border-gray-300 rounded focus:ring-[#1a1134] focus:border-[#1a1134]"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-xs font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 p-2 text-sm border border-gray-300 rounded focus:ring-[#1a1134] focus:border-[#1a1134]"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 text-sm text-white rounded transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1a1134] hover:bg-[#2a1f44] hover:cursor-pointer'}`}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-white px-2 text-gray-500 ">Or continue with</span>
                    </div>
                </div>

                {/* Social Logins */}
                <button
                    className="hover:cursor-pointer w-full flex items-center justify-center py-2 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                    </svg>
                    <span className="ml-2 ">Continue with Google</span>
                </button>

                {/* Links */}
                <div className="flex justify-between text-xs">
                    <button
                        className="text-[#1a1134] font-medium hover:underline hover:cursor-pointer"
                        onClick={() => navigate('/register')}
                    >
                        Create Account
                    </button>
                    <button
                        className="text-gray-600 hover:underline hover:cursor-pointer"
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