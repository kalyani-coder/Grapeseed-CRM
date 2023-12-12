import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { NativeBaseProvider, Box, HStack, Pressable, Center, Icon, Image } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Import the Footer component if not already imported
// import Footer from '../Footer/Footer';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
        fullName: '',
        contactNumber: '',
        address: '',
        panCard: '',
        email: '',
    });
    const [isLoading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Retrieve user data from AsyncStorage
                const storedUserData = await AsyncStorage.getItem('userData');
        
                if (storedUserData) {
                    const userData = JSON.parse(storedUserData);
                    console.log('Fetched user data:', userData);
                    // Now you can use userData in your profile screen
                } else {
                    console.warn('User data not found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error during profile data fetch:', error);
            }
        };
        


        fetchProfileData();
    }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3498db" />
            </View>
        );
    }

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/gapeseed-logo.png')} style={styles.logo} />
                </View>

                <Text style={styles.title}>Profile Page</Text>

                {/* Display Profile Data */}
                <View style={styles.profileDataContainer}>
                    <View style={styles.profileRow}>
                        <FontAwesome name="user" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.profileText}>Full Name: {profileData.clientName}</Text>
                    </View>
                    <View style={styles.profileRow}>
                        <FontAwesome name="phone" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.profileText}>Contact Number: {profileData.clientPhone}</Text>
                    </View>
                    <View style={styles.profileRow}>
                        <FontAwesome name="home" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.profileText}>Address: {profileData.clientAddress}</Text>
                    </View>
                    <View style={styles.profileRow}>
                        <FontAwesome name="id-card" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.profileText}>Pan Card: {profileData.clientPanCard}</Text>
                    </View>
                    <View style={styles.profileRow}>
                        <FontAwesome name="envelope" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.profileText}>Email: {profileData.clientEmail}</Text>
                    </View>
                </View>
            </View>
            {/* Uncomment the line below if the Footer component is not already imported */}
            {/* <Footer /> */}
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db', // Change the background color as needed
        padding: 20,
        alignItems: 'center',
    },
    logoContainer: {
        width: '80%', // Adjust the width as needed
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: '100%',
        height: 180,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff', // Text color
    },
    profileDataContainer: {
        width: '100%',
        alignItems: 'flex-start',
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    profileText: {
        fontSize: 20,
        color: '#fff', // Text color
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProfilePage;
