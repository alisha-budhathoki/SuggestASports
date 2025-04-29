import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace 192.168.1.X with your computer's local IP address
const API_URL = "http://192.168.42.14:3000/api/v1";

export const login = async (email, password) => {
  try {
    console.log('Attempting login to:', `${API_URL}/auth/login`);
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Login failed:', data);
      throw new Error(data.message || 'Login failed');
    }

    // Ensure we have a token
    if (!data.token) {
      throw new Error('No token received from server');
    }

    // Create a basic user object since the server doesn't provide one
    const userData = {
      email: email,
      name: email.split('@')[0], // Use email username as fallback name
    };

    // Save token and user data to AsyncStorage
    await AsyncStorage.setItem('userToken', data.token);
    await AsyncStorage.setItem('userData', JSON.stringify(userData));

    return {
      message: data.message,
      token: data.token,
      user: userData
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    console.log('Attempting registration to:', `${API_URL}/auth/register`);
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Registration failed:', data);
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const updatePassword = async (password) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/auth/update-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Password update failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const userData = await AsyncStorage.getItem('userData');

    if (token && userData) {
      return {
        isAuthenticated: true,
        user: JSON.parse(userData),
        token,
      };
    }
    return { isAuthenticated: false };
  } catch (error) {
    return { isAuthenticated: false };
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    console.error('Logout error:', error);
  }
};