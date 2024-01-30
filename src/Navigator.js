import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';
import Login from './screens/LoginUser';
import Register from './screens/Register';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{tabBarShowLabel: true, headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Feed}
        options={{
          title: 'Feed',
          tabBarIcon: ({tintColor}) => (
            <Icon name="home" size={30} color={tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPhoto"
        component={AddPhoto}
        options={{
          title: 'Add Picture',
          tabBarIcon: ({tintColor}) => (
            <Icon name="camera" size={30} color={tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Login}
        options={{
          title: 'Profile',
          tabBarIcon: ({tintColor}) => (
            <Icon name="user" size={30} color={tintColor} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        component={MyTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="User"
        component={Profile}
      />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
