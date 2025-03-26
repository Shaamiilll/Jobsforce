import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const HOST = import.meta.env.VITE_HOST_URL; // host url from env

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // handle the register logic
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${HOST}/auth/register`, {
                email: formData.email,
                password: formData.password,
            });
            localStorage.setItem('token', response.data.token);
            toast.success('Registration successful!');
            navigate('/home');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMsg = err.response?.data?.message || 'Registration failed. Please try again.';
                toast.error(errorMsg);
            } else {
                toast.error('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-2">
            <div className="w-full max-w-sm p-4 space-y-4 bg-white rounded-lg">
                <h1 className="text-xl font-semibold text-center text-[#1a1134]">Join JobForce</h1>
                <p className="text-center text-gray-600 text-xs">Create your account to get started.</p>

                <form className="space-y-3" onSubmit={handleRegister}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
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
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 text-sm border border-gray-300 rounded focus:ring-[#1a1134] focus:border-[#1a1134]"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 text-sm border border-gray-300 rounded focus:ring-[#1a1134] focus:border-[#1a1134]"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 text-sm  hover:cursor-pointer text-white rounded transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1a1134] hover:bg-[#2a1f44]'}`}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                </div>

                {/* Social Logins */}
                <button
                    className="w-full flex items-center hover:cursor-pointer justify-center py-2 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                    </svg>
                    <span className="ml-2">Continue with Google</span>
                </button>

                {/* Links */}
                <div className="flex justify-between text-xs">
                    <button
                        className="text-[#1a1134] font-medium hover:underline hover:cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Already have an account?
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

export default RegisterPage;