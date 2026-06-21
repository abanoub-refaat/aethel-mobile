import { createStackNavigator } from "@react-navigation/stack";

import DetailScreen from "../screens/DetailScreen";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
}
