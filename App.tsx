import "expo-dev-client";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import MainScreen from "./src/screens/mainScreen";
import SignUpScreen from "./src/screens/signUpScreen";
import SignInScreen from "./src/screens/signInScreen";
import SupportScreen from "./src/screens/supportScreen";
import ResetScreen from "./src/screens/resetScreen";
import VerificationScreen from "./src/screens/verificationScreen";
import PasswordScreen from "./src/screens/passwordScreen";
import ContactScreen from "./src/screens/contactScreen";
import AboutScreen from "./src/screens/aboutScreen";
import TosScreen from "./src/screens/tosScreen";
import PpScreen from "./src/screens/ppScreen";
import HomeScreen from "./src/screens/homeScreen";
import WorkScreen from "./src/screens/workScreen";
import ProfileScreen from "./src/screens/profileScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ChatsScreen from "./src/screens/chatsScreen";
import ChatScreen from "./src/screens/chatScreen";
import JobScreen from "./src/screens/jobScreen";
import ProjectScreen from "./src/screens/projectScreen";
import UserScreen from "./src/screens/userScreen";
import WorkSetupScreen from "./src/screens/workSetupScreen";
import SearchScreen from "./src/screens/searchScreen";
import FeedbackScreen from "./src/screens/feedbackScreen";
import AddProjectScreen from "./src/screens/addProjectScreen";
import AddJobScreen from "./src/screens/addJobScreen";
import EditProfilePictureScreen from "./src/screens/EditProfilePictureScreen";
import EditPhoneNumberScreen from "./src/screens/EditPhoneNumberScreen";
import EditEmailAddressScreen from "./src/screens/EditEmailAddressScreen";
import EditPasswordScreen from "./src/screens/EditPasswordScreen";
import authNavigatorParamList from "./src/types/params/authNavigatorParamList";
import mainNavigatorParamList from "./src/types/params/mainNavigatorParamList";
import homeNavigatorParamList from "./src/types/params/homeNavigatorParamList";
import workStackParamList from "./src/types/params/workNavigatorParamList";
import profileNavigatorParamList from "./src/types/params/profileNavigatorParamList";
import settingsNavigatorParamList from "./src/types/params/settingsNavigatorParamList";
import dashboardNavigatorParamList from "./src/types/params/dashboardNavigatorParamList";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { green, gray, blue } from "./src/theme/colors";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const AuthStack = createStackNavigator<authNavigatorParamList>();
  const MainStack = createStackNavigator<mainNavigatorParamList>();
  const HomeStack = createStackNavigator<homeNavigatorParamList>();
  const WorkStack = createStackNavigator<workStackParamList>();
  const ProfileStack = createStackNavigator<profileNavigatorParamList>();
  const SettingsStack = createStackNavigator<settingsNavigatorParamList>();

  const DashboardTab = createBottomTabNavigator<dashboardNavigatorParamList>();

  const [fontsLoaded] = useFonts({
    "IBMPlexSans-Bold": require("./assets/fonts/IBMPlexSans-Bold.ttf"),
    "IBMPlexSans-Regular": require("./assets/fonts/IBMPlexSans-Regular.ttf"),
  });

  const hideSplashScreen = async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    hideSplashScreen();
  }, [fontsLoaded]);

  useEffect(() => {
    auth().onAuthStateChanged((userState) => {
      setUser(userState);
    });
  }, []);

  const HomeNavigator = () => {
    return (
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Project" component={ProjectScreen} />
        <HomeStack.Screen name="Job" component={JobScreen} />
        <HomeStack.Screen name="User" component={UserScreen} />
        <HomeStack.Screen name="AddJob" component={AddJobScreen} />
      </HomeStack.Navigator>
    );
  };

  const WorkNavigator = () => {
    return (
      <WorkStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <WorkStack.Screen name="Work" component={WorkScreen} />
        <WorkStack.Screen name="WorkSetup" component={WorkSetupScreen} />
        <WorkStack.Screen name="Search" component={SearchScreen} />
        <WorkStack.Screen name="Project" component={ProjectScreen} />
        <WorkStack.Screen name="Job" component={JobScreen} />
        <WorkStack.Screen name="User" component={UserScreen} />
        <ProfileStack.Screen name="AddJob" component={AddJobScreen} />
      </WorkStack.Navigator>
    );
  };

  const ProfileNavigator = () => {
    return (
      <ProfileStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        <ProfileStack.Screen name="Project" component={ProjectScreen} />
        <ProfileStack.Screen name="Job" component={JobScreen} />
        <ProfileStack.Screen name="User" component={UserScreen} />
        <ProfileStack.Screen name="Feedback" component={FeedbackScreen} />
        <ProfileStack.Screen name="AddProject" component={AddProjectScreen} />
        <ProfileStack.Screen name="AddJob" component={AddJobScreen} />
      </ProfileStack.Navigator>
    );
  };

  const SettingsNavigator = () => {
    return (
      <SettingsStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <SettingsStack.Screen name="Settings" component={SettingsScreen} />
        <SettingsStack.Screen
          name="EditProfilePicture"
          component={EditProfilePictureScreen}
        />
        <SettingsStack.Screen
          name="EditPhoneNumber"
          component={EditPhoneNumberScreen}
        />
        <SettingsStack.Screen
          name="EditEmailAddress"
          component={EditEmailAddressScreen}
        />
        <SettingsStack.Screen
          name="EditPassword"
          component={EditPasswordScreen}
        />
      </SettingsStack.Navigator>
    );
  };

  const DashboardTabNavigator = () => {
    return (
      <DashboardTab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          gestureEnabled: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: "10%",
            backgroundColor: blue,
            borderTopColor: blue,
          },
          tabBarIcon: ({ focused }) => {
            if (route.name === "HomeNav") {
              return (
                <Entypo name="home" size={30} color={focused ? green : gray} />
              );
            } else if (route.name === "WorkNav") {
              return (
                <Ionicons
                  name="briefcase"
                  size={30}
                  color={focused ? green : gray}
                />
              );
            } else if (route.name === "ProfileNav") {
              return (
                <FontAwesome
                  name="user"
                  size={30}
                  color={focused ? green : gray}
                />
              );
            } else if (route.name === "SettingsNav") {
              return (
                <Ionicons
                  name="settings"
                  size={30}
                  color={focused ? green : gray}
                />
              );
            }
          },
        })}
      >
        <DashboardTab.Screen name="HomeNav" component={HomeNavigator} />
        <DashboardTab.Screen name="WorkNav" component={WorkNavigator} />
        <DashboardTab.Screen name="ProfileNav" component={ProfileNavigator} />
        <DashboardTab.Screen name="SettingsNav" component={SettingsNavigator} />
      </DashboardTab.Navigator>
    );
  };

  const AppNavigator = () => {
    if (!user) {
      return (
        <AuthStack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
        >
          <AuthStack.Screen name="Main" component={MainScreen} />
          <AuthStack.Screen name="SignUp" component={SignUpScreen} />
          <AuthStack.Screen name="SignIn" component={SignInScreen} />
          <AuthStack.Screen name="Support" component={SupportScreen} />
          <AuthStack.Screen name="Reset" component={ResetScreen} />
          <AuthStack.Screen
            name="Verification"
            component={VerificationScreen}
          />
          <AuthStack.Screen name="Password" component={PasswordScreen} />
          <AuthStack.Screen name="Contact" component={ContactScreen} />
          <AuthStack.Screen name="About" component={AboutScreen} />
          <AuthStack.Screen name="TOS" component={TosScreen} />
          <AuthStack.Screen name="PP" component={PpScreen} />
        </AuthStack.Navigator>
      );
    } else {
      return (
        <MainStack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
        >
          <MainStack.Screen
            name="Dashboard"
            component={DashboardTabNavigator}
          />
          <MainStack.Screen name="Chats" component={ChatsScreen} />
          <MainStack.Screen name="Chat" component={ChatScreen} />
          <MainStack.Screen name="Support" component={SupportScreen} />
          <MainStack.Screen name="Contact" component={ContactScreen} />
          <MainStack.Screen name="About" component={AboutScreen} />
          <MainStack.Screen name="TOS" component={TosScreen} />
          <MainStack.Screen name="PP" component={PpScreen} />
        </MainStack.Navigator>
      );
    }
  };

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <StatusBar style="inverted" />
        <AppNavigator />
      </NavigationContainer>
    );
  }
};

export default App;
