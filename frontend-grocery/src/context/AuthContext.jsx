import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// We will use axios in the future, but import is here for context
// import axios from 'axios'; 

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Custom Hook to use the Auth Context easily
export const useAuth = () => {
    return useContext(AuthContext);
};

// 3. Auth Provider Component
export const AuthProvider = ({ children }) => {
    // State to hold user info (null if logged out)
    const [user, setUser] = useState(null);
    // State to hold loading status (e.g., when checking token)
    const [isLoading, setIsLoading] = useState(true); 
    
    // Derived state for easy access
    const isAuthenticated = !!user;
    const userRole = user ? user.role : null;

    useEffect(() => {
        // --- Future: Check for existing JWT in LocalStorage on load ---
        const token = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role'); 
        
        if (token && storedRole) {
            // Simulate successful token check.
            setUser({ 
                id: '123', 
                name: 'Test User', 
                role: storedRole,
                token: token
            });
            // Toast removed here to prevent issues on initial render
            // toast.info(`Welcome back, ${storedRole.toUpperCase()}!`); 
        }
        
        // Use a timeout to ensure the state updates safely after the initial mount
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 50); // Small delay, just enough to ensure render completion

        return () => clearTimeout(timer); // Cleanup function

    }, []);


    // Function to handle login (to be called by Login-component)
    const login = (userData, token) => {
        // This function will be called AFTER a successful backend API response
        localStorage.setItem('token', token);
        localStorage.setItem('role', userData.role);
        setUser({ ...userData, token });
        toast.success(`Logged in as ${userData.role.toUpperCase()}`);
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUser(null);
        toast.info("You have been logged out.");
    };

    const value = {
        user,
        isAuthenticated,
        userRole,
        login,
        logout,
        isLoading
    };

    if (isLoading) {
        // Simple loading screen or spinner while checking local storage
        return <div style={{ textAlign: 'center', padding: '100px' }}>Loading application...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};