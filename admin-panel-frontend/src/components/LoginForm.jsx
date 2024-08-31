import { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log the email and password to ensure they are correct
        console.log('Attempting login with:', { email, password });

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

            // Log the response to verify the structure of the data
            console.log('Login successful:', res.data);

            // Store the token and pass the user info to the onLogin handler
            localStorage.setItem('token', res.data.token);
            onLogin(res.data.user);
        } catch (err) {
            // Log the error details for better debugging
            console.error('Login failed:', err.response ? err.response.data : err.message);

            // Alert the user with a more specific message
            alert(err.response?.data?.message || 'Login failed! Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl mb-4">Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border p-2 mb-4 w-full"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border p-2 mb-4 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
