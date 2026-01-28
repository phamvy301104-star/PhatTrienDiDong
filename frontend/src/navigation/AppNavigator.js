import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext} from '../contexts/AuthContext';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import BookAppointmentScreen from '../screens/BookAppointmentScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{title: 'Create Account'}}
    />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{title: 'Services'}}
    />
    <Stack.Screen
      name="BookAppointment"
      component={BookAppointmentScreen}
      options={{title: 'Book Appointment'}}
    />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#999',
    }}>
    <Tab.Screen
      name="HomeTab"
      component={HomeStack}
      options={{
        headerShown: false,
        title: 'Services',
      }}
    />
    <Tab.Screen
      name="Appointments"
      component={AppointmentsScreen}
      options={{
        title: 'My Appointments',
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Profile',
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const {user, loading} = useContext(AuthContext);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
