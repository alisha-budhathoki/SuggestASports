import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace 192.168.1.X with your computer's local IP address
const API_URL = "https://gemini47.onrender.com/api/v1";

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

export const sendChatMessage = async (message) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    console.log('Sending chat message to:', `${API_URL}/chats`);
    const requestBody = { message };
    console.log('Request payload:', requestBody);
    console.log('Using token:', token.substring(0, 10) + '...');

    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_URL}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    console.log('Response status:', response.status);
    console.log('Response headers:', JSON.stringify(Object.fromEntries(response.headers.entries())));

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    console.log('Response content type:', contentType);

    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid content type received:', contentType);
      throw new Error('Server returned non-JSON response');
    }

    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      console.error('Server error response:', data);
      throw new Error(data.message || 'Failed to send message');
    }

    return data;
  } catch (error) {
    console.error('Chat error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      type: error.constructor.name
    });

    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your internet connection.');
    }

    if (error.message === 'Network request failed') {
      throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
    }

    if (error.message === 'Server returned non-JSON response') {
      throw new Error('Server error. Please try again later.');
    }
    throw error;
  }
};