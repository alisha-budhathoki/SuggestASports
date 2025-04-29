import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, ActivityIndicator, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { checkAuthStatus } from './services/api';

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import QuizScreen from './screens/QuizScreen';
import QuizQuestions from './screens/QuizQuestions';
import QuizResults from './screens/QuizResults';
import ChatBotScreen from './screens/ChatBotScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'HomeTab':
              iconName = 'home';
              break;
            case 'Quiz':
              iconName = 'help';
              break;
            case 'Chat':
              iconName = 'chat';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Chat" component={ChatBotScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Main Stack Navigator
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const { isAuthenticated } = await checkAuthStatus();
      setIsAuthenticated(isAuthenticated);
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Main' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
          name="QuizQuestions"
          component={QuizQuestions}
          options={{
            headerShown: true,
            headerTitle: 'Sports Quiz',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="QuizResults"
          component={QuizResults}
          options={{
            headerShown: true,
            headerTitle: 'Quiz Results',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="AddActivity"
          component={AddActivityScreen}
          options={{
            headerShown: true,
            headerTitle: 'Add Activity',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
