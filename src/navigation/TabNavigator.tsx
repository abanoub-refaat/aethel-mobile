import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(253, 251, 247, 0.62)",
          borderTopColor: "#4A3B4C",
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                source={require("../../assets/icons/home-svgrepo-com.png")}
                style={{
                  width: 26,
                  height: 26,
                }}
              />
            ) : (
              <Image
                source={require("../../assets/icons/home-filled-svgrepo-com.png")}
                style={{
                  width: 26,
                  height: 26,
                }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                source={require("../../assets/icons/image-svgrepo-com.png")}
                style={{
                  width: 26,
                  height: 26,
                }}
              />
            ) : (
              <Image
                source={require("../../assets/icons/image-filled-svgrepo-com.png")}
                style={{
                  width: 26,
                  height: 26,
                }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image
                source={require("../../assets/icons/bookmark-list-svgrepo-com.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            ) : (
              <Image
                source={require("../../assets/icons/bookmark-list-filled-svgrepo-com.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
