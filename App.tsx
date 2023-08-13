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
import MainScreen from './src/screens/mainScreen'
import SignUpScreen from './src/screens/signUpScreen'
import SignInScreen from './src/screens/signInScreen'
import SupportScreen from './src/screens/supportScreen'
import ResetScreen from './src/screens/resetScreen'
import VerificationScreen from './src/screens/verificationScreen'
import PasswordScreen from './src/screens/passwordScreen'
import ContactScreen from './src/screens/contactScreen'
import AboutScreen from './src/screens/aboutScreen'
import TosScreen from './src/screens/tosScreen'
import PpScreen from './src/screens/ppScreen'
import HomeScreen from './src/screens/homeScreen'
import WorkScreen from './src/screens/workScreen'
import ProfileScreen from './src/screens/profileScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import ChatsScreen from './src/screens/chatsScreen'
import ChatScreen from './src/screens/chatScreen'
import JobScreen from './src/screens/jobScreen'
import ProjectScreen from './src/screens/projectScreen'
import UserScreen from './src/screens/userScreen'
import WorkSetupScreen from './src/screens/workSetupScreen'
import SearchScreen from './src/screens/searchScreen'
import FeedbackScreen from './src/screens/feedbackScreen'
import AddProjectScreen from './src/screens/addProjectScreen'
import AddJobScreen from './src/screens/addJobScreen'
import EditProfilePictureScreen from './src/screens/EditProfilePictureScreen'
import EditPhoneNumberScreen from './src/screens/EditPhoneNumberScreen'
import EditEmailAddressScreen from './src/screens/EditEmailAddressScreen'
import EditPasswordScreen from './src/screens/EditPasswordScreen'
import authNavigatorParamList from './src/types/params/authNavigatorParamList'
import dashboardNavigatorParamList from './src/types/params/dashboardNavigatorParamList'
import mainNavigatorParamList from './src/types/params/mainNavigatorParamList'
import AuthUser from './src/data/authUser'
import useAuthUserStore from './src/stores/useAuthUserStore'
import { Foundation } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { yellowGreen, silver, raisinBlack } from './src/theme/colors'

SplashScreen.preventAutoHideAsync()

const App = () => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

    const AuthStack = createStackNavigator<authNavigatorParamList>()
    const DashboardTab = createBottomTabNavigator<dashboardNavigatorParamList>()
    const MainStack = createStackNavigator<mainNavigatorParamList>()

    const { updateAuthUser } = useAuthUserStore((state) => state)

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

    useEffect(() => {
        if (user) {
            AuthUser.getAuthUser().then((result) => {
                updateAuthUser(result.data)
            })
        }
    }, [user])

    const AuthStackNavigator = () => {
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
        return (
            <DashboardTab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    gestureEnabled: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        height: Platform.OS === 'ios' ? '12%' : '10%',
                        paddingTop: Platform.OS === 'ios' ? '2%' : '0%',
                        backgroundColor: raisinBlack,
                        borderTopColor: raisinBlack,
                    },
                    tabBarIcon: ({ focused }) => {
                        if (route.name === 'Home') {
                            return (
                                <Foundation
                                    name="home"
                                    size={32}
                                    color={focused ? yellowGreen : silver}
                                />
                            )
                        } else if (route.name === 'Chats') {
                            return (
                                <MaterialCommunityIcons
                                    name="android-messages"
                                    size={32}
                                    color={focused ? yellowGreen : silver}
                                />
                            )
                        } else if (route.name === 'Work') {
                            return (
                                <Ionicons
                                    name="briefcase"
                                    size={32}
                                    color={focused ? yellowGreen : silver}
                                />
                            )
                        } else if (route.name === 'Profile') {
                            return (
                                <FontAwesome
                                    name="user"
                                    size={32}
                                    color={focused ? yellowGreen : silver}
                                />
                            )
                        } else if (route.name === 'Settings') {
                            return (
                                <Ionicons
                                    name="settings"
                                    size={32}
                                    color={focused ? yellowGreen : silver}
                                />
                            )
                        }
                    },
                })}
            >
                <DashboardTab.Screen name="Home" component={HomeScreen} />
                <DashboardTab.Screen name="Chats" component={ChatsScreen} />
                <DashboardTab.Screen name="Work" component={WorkScreen} />
                <DashboardTab.Screen name="Profile" component={ProfileScreen} />
                <DashboardTab.Screen
                    name="Settings"
                    component={SettingsScreen}
                />
            </DashboardTab.Navigator>
        )
    }

    const MainStackNavigator = () => {
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
                <MainStack.Screen name="Project" component={ProjectScreen} />
                <MainStack.Screen name="Job" component={JobScreen} />
                <MainStack.Screen name="User" component={UserScreen} />
                <MainStack.Screen name="Feedback" component={FeedbackScreen} />
                <MainStack.Screen name="Chat" component={ChatScreen} />
                <MainStack.Screen
                    name="WorkSetup"
                    component={WorkSetupScreen}
                />
                <MainStack.Screen name="Search" component={SearchScreen} />
                <MainStack.Screen
                    name="AddProject"
                    component={AddProjectScreen}
                />
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

    const AppNavigator = () => {
        if (!user) {
            return <AuthStackNavigator />
        } else {
            return <MainStackNavigator />
        }
    }

    if (!fontsLoaded) {
        return null
    } else {
        return (
            <NavigationContainer>
                <StatusBar style="inverted" />
                <AppNavigator />
            </NavigationContainer>
        )
    }
}

export default App
