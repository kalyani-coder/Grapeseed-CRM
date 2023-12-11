import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Screens/Login/Login';
import Dashboard from './Screens/Home/Dashboard';
import CustomerDetailsScreen from './Screens/CustomerDetails/CustomerDetailsScreen';
import PersonalInfoPage from './Screens/PersonalInfoPage/PersonalInfoPage';
import NomineeDetailsScreen from './Screens/Nominee/Nominee';
import PhysicalInfoPage from './Screens/Physical/Physical';
import ViewInquiryPage from './Screens/ViewEnquiry/ViewEnquiry';
import UpdateStatusPage from './Screens/UpdateStatus/UpdateStatus';
import EditEnquiryStatus from './Screens/EditEnquiryStatus/EditEnquiryStatus';
import ProfilePage from './Screens/Profile/Profile';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CustomerDetailsScreen" component={CustomerDetailsScreen} />
        <Stack.Screen name="PersonalInfoPage" component={PersonalInfoPage} />
        <Stack.Screen name="NomineeDetailsScreen" component={NomineeDetailsScreen} />
        <Stack.Screen name="PhysicalInfoPage" component={PhysicalInfoPage} />
        <Stack.Screen name="ViewInquiryPage" component={ViewInquiryPage} />
        <Stack.Screen name="UpdateStatusPage" component={UpdateStatusPage} />
        <Stack.Screen name="EditInquiryStatus" component={EditEnquiryStatus} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
