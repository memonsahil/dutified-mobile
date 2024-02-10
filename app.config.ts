export default {
    expo: {
        name: 'Dutified',
        slug: 'dutified-mobile',
        version: '1.0.0',
        owner: 'memonsahil',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        splash: {
            image: './assets/images/splash.png',
            backgroundColor: '#E1E1E1',
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            bundleIdentifier: 'com.dutified',
            googleServicesFile: process.env.IOS_FIREBASE_SDK_CONFIG,
        },
        android: {
            package: 'com.dutified',
            googleServicesFile: process.env.ANDROID_FIREBASE_SDK_CONFIG,
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon.png',
                backgroundColor: '#1A1A23',
            },
            softwareKeyboardLayoutMode: 'pan',
            permissions: [],
        },
        plugins: [
            '@react-native-firebase/app',
            [
                'expo-build-properties',
                {
                    ios: {
                        useFrameworks: 'static',
                    },
                },
            ],
            [
                'expo-image-picker',
                {
                    photosPermission:
                        'Dutified needs access to your photos to let you upload your profile picture.',
                },
            ],
        ],
        extra: {
            eas: {
                projectId: '5315d69e-9cf7-416d-912c-8638ce458fee',
            },
        },
    },
}
