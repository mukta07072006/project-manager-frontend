'use client';
import { 
  Envelope, 
  Lock, 
  ArrowRight, 
  LayoutSplitColumns 
} from '@gravity-ui/icons';
import { authClient } from '../lib/auth-client';
import { useRouter } from 'next/navigation';
import { set } from 'better-auth';
import { useState } from 'react';

const LoginPage = () => {


    const router = useRouter();
  
    const {
        data: session,
        isPending, //loading state 
        refetch
    } = authClient.useSession()

    console.log(session)

    if (session && !isPending){
        router.push("/dashboard");
    }


    const [error , setError] = useState(false);
    const [message, setMessage] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const {data, error} = await authClient.signIn.email({
      email,
      password
    }, {
        onSuccess: () => {
          router.push("/dashboard");
          setError(false);
          setMessage("");
        },
        onError: (err) => {
          setMessage(err.error?.message);
          console.log(err)
          setError(true);
        }
    })



};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
              <LayoutSplitColumns width={32} height={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Enter your details to access your account</p>
          </div>
    {
            error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {message}
            </div>
    }
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Envelope width={18} height={18} />
              </div>
              <input
                type="email"
                required
                placeholder="name@example.com"
                name='email'
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock width={18} height={18} />
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                name='password'
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-200 mt-2"
          >
            Sign In
            <ArrowRight width={18} height={18} />
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 font-medium hover:underline">
              Create one
            </a>
          </p>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;