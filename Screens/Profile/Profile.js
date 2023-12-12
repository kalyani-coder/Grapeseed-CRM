import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, NativeBaseProvider } from 'native-base';

const ProfilePage = ({ navigation }) => {
    const [profileData, setProfileData] = useState({
        clientName: '',
        clientPhone: '',
        clientAddress: '',
        clientPanCard: '',
        clientEmail: '',
    });
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Retrieve user ID from AsyncStorage
                const userId = await AsyncStorage.getItem('userId');

                if (userId) {
                    // Fetch user data using the retrieved user ID
                    const apiUrl = `https://executive-grapeseed.onrender.com/api/clients/${userId}`;
                    const response = await fetch(apiUrl);

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const userData = await response.json();
                    setProfileData(userData);

                    setLoading(false);
                } else {
                    console.warn('User ID not found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error during profile data fetch:', error);
                setLoading(false);
                Alert.alert('Error', 'Failed to fetch profile data. Please try again.');
            }
        };

        fetchProfileData();
    }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

    const handleLogout = async () => {
        try {
            // Clear user data from AsyncStorage
            await AsyncStorage.removeItem('userId');

            // Navigate to the login screen or any other screen after logout
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Error', 'Failed to logout. Please try again.');
        }
    };

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

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#daa520', // Change the background color as needed
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
        color: '#000', // Text color
    },
    profileDataContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 20,
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
        color: '#000', // Text color
    },
    logoutButton: {
        backgroundColor: '#e74c3c', // Adjust the background color as needed
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#fff', // Text color
        fontSize: 16,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProfilePage;
