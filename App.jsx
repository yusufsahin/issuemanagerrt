import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectsList from './src/screens/ProjectsList';
import AddProjectForm from './src/screens/AddProjectForm';
import EditProjectForm from './src/screens/EditProjectForm';
import ProjectDetails from './src/screens/ProjectDetails';
import AddIssueForm from './src/screens/AddIssueForm';
import EditIssueForm from './src/screens/EditIssueForm';
import IssueDetails from './src/screens/IssueDetails';
import IssueDelete from './src/screens/IssueDelete';
import ProjectDelete from './src/screens/ProjectDelete';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Projects" component={ProjectsList} />
            <Stack.Screen name="AddProject" component={AddProjectForm} />
            <Stack.Screen name="EditProject" component={EditProjectForm} />
            <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
            <Stack.Screen name="ProjectDelete" component={ProjectDelete} />
            <Stack.Screen name="AddIssue" component={AddIssueForm} />
            <Stack.Screen name="EditIssue" component={EditIssueForm} />
            <Stack.Screen name="IssueDetails" component={IssueDetails} />
            <Stack.Screen name="IssueDelete" component={IssueDelete} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
