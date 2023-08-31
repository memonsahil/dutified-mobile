import 'expo-dev-client'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import MainScreen from './src/screens/ui/mainScreen'
import SignUpScreen from './src/screens/ui/signUpScreen'
import SignInScreen from './src/screens/ui/signInScreen'
import SupportScreen from './src/screens/ui/supportScreen'
import ResetScreen from './src/screens/ui/resetScreen'
import VerificationScreen from './src/screens/ui/verificationScreen'
import PasswordScreen from './src/screens/ui/passwordScreen'
import ContactScreen from './src/screens/ui/contactScreen'
import AboutScreen from './src/screens/ui/aboutScreen'
import TosScreen from './src/screens/ui/tosScreen'
import PpScreen from './src/screens/ui/ppScreen'
import HomeScreen from './src/screens/ui/homeScreen'
import ProfileScreen from './src/screens/ui/profileScreen'
import SettingsScreen from './src/screens/ui/SettingsScreen'
import ChatsScreen from './src/screens/ui/chatsScreen'
import ChatScreen from './src/screens/ui/chatScreen'
import JobScreen from './src/screens/ui/jobScreen'
import UserScreen from './src/screens/ui/userScreen'
import SearchScreen from './src/screens/ui/searchScreen'
import FeedbackScreen from './src/screens/ui/feedbackScreen'
import AddJobScreen from './src/screens/ui/addJobScreen'
import EditProfilePictureScreen from './src/screens/ui/EditProfilePictureScreen'
import EditPhoneNumberScreen from './src/screens/ui/EditPhoneNumberScreen'
import EditEmailAddressScreen from './src/screens/ui/EditEmailAddressScreen'
import EditPasswordScreen from './src/screens/ui/EditPasswordScreen'
import authNavigatorParamList from './src/params/authNavigatorParamList'
import dashboardNavigatorParamList from './src/params/dashboardNavigatorParamList'
import mainNavigatorParamList from './src/params/mainNavigatorParamList'
import { Foundation } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from './src/enums/themeColors'

SplashScreen.preventAutoHideAsync()

const AuthStackNavigator = () => {
    const AuthStack = createStackNavigator<authNavigatorParamList>()

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
            <AuthStack.Screen name="Reset" component={ResetScreen} />
            <AuthStack.Screen
                name="Verification"
                component={VerificationScreen}
            />
            <AuthStack.Screen name="Password" component={PasswordScreen} />
            <AuthStack.Screen name="Support" component={SupportScreen} />
            <AuthStack.Screen name="Contact" component={ContactScreen} />
            <AuthStack.Screen name="About" component={AboutScreen} />
            <AuthStack.Screen name="TOS" component={TosScreen} />
            <AuthStack.Screen name="PP" component={PpScreen} />
        </AuthStack.Navigator>
    )
}

const DashboardTabNavigator = () => {
    const DashboardTab = createBottomTabNavigator<dashboardNavigatorParamList>()

    return (
        <DashboardTab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                gestureEnabled: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: Platform.OS === 'ios' ? '12%' : '10%',
                    paddingTop: Platform.OS === 'ios' ? '2%' : '0%',
                    backgroundColor: themeColors.RAISIN_BLACK,
                    borderTopColor: themeColors.RAISIN_BLACK,
                },
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'Home') {
                        return (
                            <Foundation
                                name="home"
                                size={30}
                                color={
                                    focused
                                        ? themeColors.YELLOW_GREEN
                                        : themeColors.SILVER
                                }
                            />
                        )
                    } else if (route.name === 'Chats') {
                        return (
                            <MaterialCommunityIcons
                                name="android-messages"
                                size={30}
                                color={
                                    focused
                                        ? themeColors.YELLOW_GREEN
                                        : themeColors.SILVER
                                }
                            />
                        )
                    } else if (route.name === 'Profile') {
                        return (
                            <FontAwesome
                                name="user"
                                size={30}
                                color={
                                    focused
                                        ? themeColors.YELLOW_GREEN
                                        : themeColors.SILVER
                                }
                            />
                        )
                    } else if (route.name === 'Settings') {
                        return (
                            <Ionicons
                                name="settings"
                                size={30}
                                color={
                                    focused
                                        ? themeColors.YELLOW_GREEN
                                        : themeColors.SILVER
                                }
                            />
                        )
                    }
                },
            })}
        >
            <DashboardTab.Screen name="Home" component={HomeScreen} />
            <DashboardTab.Screen name="Chats" component={ChatsScreen} />
            <DashboardTab.Screen name="Profile" component={ProfileScreen} />
            <DashboardTab.Screen name="Settings" component={SettingsScreen} />
        </DashboardTab.Navigator>
    )
}

const MainStackNavigator = () => {
    const MainStack = createStackNavigator<mainNavigatorParamList>()

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
            <MainStack.Screen name="Job" component={JobScreen} />
            <MainStack.Screen name="User" component={UserScreen} />
            <MainStack.Screen name="Feedback" component={FeedbackScreen} />
            <MainStack.Screen name="Chat" component={ChatScreen} />
            <MainStack.Screen name="Search" component={SearchScreen} />
            <MainStack.Screen name="AddJob" component={AddJobScreen} />
            <MainStack.Screen
                name="EditProfilePicture"
                component={EditProfilePictureScreen}
            />
            <MainStack.Screen
                name="EditPhoneNumber"
                component={EditPhoneNumberScreen}
            />
            <MainStack.Screen
                name="EditEmailAddress"
                component={EditEmailAddressScreen}
            />
            <MainStack.Screen
                name="EditPassword"
                component={EditPasswordScreen}
            />
            <MainStack.Screen name="Support" component={SupportScreen} />
            <MainStack.Screen name="Contact" component={ContactScreen} />
            <MainStack.Screen name="About" component={AboutScreen} />
            <MainStack.Screen name="TOS" component={TosScreen} />
            <MainStack.Screen name="PP" component={PpScreen} />
        </MainStack.Navigator>
    )
}

const App = () => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

    const [fontsLoaded] = useFonts({
        'IBMPlexSansCondensed-SemiBold': require('./assets/fonts/IBMPlexSansCondensed-SemiBold.ttf'),
        'IBMPlexSansCondensed-Medium': require('./assets/fonts/IBMPlexSansCondensed-Medium.ttf'),
    })

    const hideSplashScreen = async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }

    useEffect(() => {
        hideSplashScreen()
    }, [fontsLoaded])

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((authUser) => {
            setUser(authUser)
        })

        return () => subscriber()
    }, [])

    if (!fontsLoaded) {
        return null
    } else {
        return (
            <NavigationContainer>
                <StatusBar style="inverted" />
                {true ? <AuthStackNavigator /> : <MainStackNavigator />}
            </NavigationContainer>
        )
    }
}

export default App
