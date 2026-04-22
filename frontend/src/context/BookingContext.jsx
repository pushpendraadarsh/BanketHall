// context/BookingContext.jsx
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchStatsRef = useRef(null);
  const abortControllerRef = useRef(null);

  const fetchStats = useCallback(async () => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    // Prevent multiple simultaneous calls
    if (fetchStatsRef.current === 'pending') {
      console.log('Fetch already in progress, skipping...');
      return;
    }

    if (!token) {
      console.log('No token available, skipping stats fetch');
      return;
    }

    try {
      fetchStatsRef.current = 'pending';
      setLoading(true);
      setError(null);
      
      console.log('Fetching stats...');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/bookings/stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        signal: abortControllerRef.current.signal
      });
      
      console.log('Stats response:', response.data);
      setStats(response.data);
      fetchStatsRef.current = 'completed';
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Fetch aborted');
        return;
      }
      console.error('Error fetching stats:', err);
      setError(err.response?.data?.message || 'Failed to fetch stats');
      fetchStatsRef.current = 'error';
    } finally {
      setLoading(false);
      if (fetchStatsRef.current !== 'pending') {
        fetchStatsRef.current = null;
      }
    }
  }, [token]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    fetchStatsRef.current = null;
  }, []);

  const value = {
    stats,
    loading,
    error,
    fetchStats,
    cleanup
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};