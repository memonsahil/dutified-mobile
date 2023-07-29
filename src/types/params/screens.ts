/**
 * @description
 * When a new screen is created, it must be added to the below screens type
 * and to the paramList type of its relevant navigator.
 *
 * Screens are organised in the following order:
 *
 * AppNavigator
 * |-- AuthStackNavigator
 * |    |-- Main
 * |    |-- SignUp
 * |    |-- SignIn
 * |    |-- Reset
 * |    |-- Verification
 * |    |-- Password
 * |    |-- Support
 * |    |-- Contact
 * |    |-- About
 * |    |-- TOS
 * |    |-- PP
 * |-- MainStackNavigator
 *      |-- DashboardTabNavigator
 *      |   |-- HomeStackNavigator
 *      |   |       |-- Home
 *      |   |       |-- Project
 *      |   |       |-- Job
 *      |   |       |-- User
 *      |   |       |-- AddJob
 *      |   |-- WorkStackNavigator
 *      |   |       |-- Work
 *      |   |       |-- WorkSetup
 *      |   |       |-- Search
 *      |   |       |-- Project
 *      |   |       |-- Job
 *      |   |       |-- User
 *      |   |-- ProfileStackNavigator
 *      |   |       |-- Profile
 *      |   |       |-- Project
 *      |   |       |-- Job
 *      |   |       |-- User
 *      |   |       |-- Feedback
 *      |   |       |-- AddProject
 *      |   |       |-- AddJob
 *      |   |-- SettingsStackNavigator
 *      |           |-- Settings
 *      |           |-- EditProfilePicture
 *      |           |-- EditPhoneNumber
 *      |           |-- EditEmailAddress
 *      |           |-- EditPassword
 *      |           |-- ManageAccount
 *      |-- Chats
 *      |-- Chat
 *      |-- Support
 *      |-- Contact
 *      |-- About
 *      |-- TOS
 *      |-- PP
 */

type screens = {
  Main: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Reset: undefined;
  Verification: undefined;
  Password: undefined;

  Dashboard: undefined;
  Home: undefined;
  Work: undefined;
  Profile: undefined;
  Settings: undefined;

  Chats: undefined;
  Chat: undefined;
  Support: undefined;
  Contact: undefined;
  About: undefined;
  TOS: undefined;
  PP: undefined;

  Project: {
    projectId: string;
  };
  Job: {
    jobId: string;
  };
  User: {
    userId: string;
  };

  WorkSetup: undefined;
  Search: undefined;

  Feedback: undefined;
  AddProject: undefined;
  AddJob: {
    projectId: string;
    projectName: string;
    jobCreatorId: string;
    jobCreator: string;
  };

  EditProfilePicture: undefined;
  EditPhoneNumber: undefined;
  EditEmailAddress: undefined;
  EditPassword: undefined;
};

export default screens;
