import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "https://gemini47.onrender.com/api/v1";

export const fetchFootballMatches = async () => {
  try {
    console.log(
			"Fetching football matches from:",
			`${API_URL}=sports/football/live`
		);

    const response = await fetch(`${API_URL}/sports/football/live`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to fetch football matches: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received data:', data);
    return data.data;
  } catch (error) {
    console.error('Error fetching football matches:', error);
    throw error;
  }
};