import { useState, type ChangeEvent, type FormEvent } from "react";
import { handleSignup } from "./AuthGoogleComponent";
import { SignInWithGoogleComponent } from "./AuthGoogleComponent";


const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            console.error("Passwords do not match.");
            return;
        }
        handleSignup(email, password);
    };

    return (
        <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Email input field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Email"
                    />
                </div>
            </div>

            {/* Password input field */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Password"
                    />
                    {/* Eye icon for password visibility toggle (not functional, for visual only) */}
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path fillRule="evenodd" d="M.661 10.378a.8.8 0 011.077-.123A10.046 10.046 0 0010 3.25c2.724 0 5.253.992 7.262 2.627a.8.8 0 011.077.123.75.75 0 010 1.077 1.054 1.054 0 00-1.414 0A12.046 12.046 0 0110 5.75c-2.724 0-5.253.992-7.262 2.627a1.054 1.054 0 00-1.414 0 .75.75 0 010-1.077zM.661 9.622a.75.75 0 010-1.077 1.054 1.054 0 001.414 0A12.046 12.046 0 0110 14.25c2.724 0 5.253-.992 7.262-2.627a1.054 1.054 0 001.414 0 .75.75 0 010 1.077.8.8 0 01-1.077.123A10.046 10.046 0 0010 16.75c-2.724 0-5.253-.992-7.262-2.627a.8.8 0 01-1.077-.123.75.75 0 010-1.077z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Confirm Password input field */}
            <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="mt-1 relative">
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Confirm Password"
                    />
                    {/* Eye icon for password visibility toggle (not functional, for visual only) */}
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path fillRule="evenodd" d="M.661 10.378a.8.8 0 011.077-.123A10.046 10.046 0 0010 3.25c2.724 0 5.253.992 7.262 2.627a.8.8 0 011.077.123.75.75 0 010 1.077 1.054 1.054 0 00-1.414 0A12.046 12.046 0 0110 5.75c-2.724 0-5.253.992-7.262 2.627a1.054 1.054 0 00-1.414 0 .75.75 0 010-1.077zM.661 9.622a.75.75 0 010-1.077 1.054 1.054 0 001.414 0A12.046 12.046 0 0110 14.25c2.724 0 5.253-.992 7.262-2.627a1.054 1.054 0 001.414 0 .75.75 0 010 1.077.8.8 0 01-1.077.123A10.046 10.046 0 0010 16.75c-2.724 0-5.253-.992-7.262-2.627a.8.8 0 01-1.077-.123.75.75 0 010-1.077z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Sign Up button */}
            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                    Sign Up
                </button>
            </div>

            {/* Or separator */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                        or
                    </span>
                </div>
            </div>

            {/* Sign up with Google button */}
            <SignInWithGoogleComponent/>

            {/* Already have an account link */}
            <div className="flex justify-center text-sm">
                <p className="text-gray-500">
                    Already have an account?{' '}
                    <a href="/" className="font-medium text-blue-600 hover:text-blue-500">
                        Log In
                    </a>
                </p>
            </div>
        </form>
    );
};

export default SignUpForm;