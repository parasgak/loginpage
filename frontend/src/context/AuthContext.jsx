import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:5000/api/auth/profile', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => setUser(res.data))
            .catch(() => {
                localStorage.removeItem('token');
                setUser(null);
            })
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
