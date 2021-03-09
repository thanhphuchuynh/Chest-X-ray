import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { DetectScreen, Introduction, PortScreen } from '../Screens';

const Stack = createStackNavigator();

export const StackNavigation: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Introduction" component={Introduction} />
      <Stack.Screen name="PortScreen" component={PortScreen} />
      <Stack.Screen name="DetectScreen" component={DetectScreen} />
    </Stack.Navigator>
  );
};

export const RootNavigation: React.FC = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
};
