// Import necessary modules and components
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Animated, Easing, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

// Create the Login component
const Login = () => {
    const navigation = useNavigation();

    // State variables for email, password, and animation
    const [clientEmail, setClientEmail] = useState('');
    const [clientPassword, setClientPassword] = useState('');
    const [isAnimating, setAnimating] = useState(false);

    // Animated value for rotation animation
    const rotateValue = useRef(new Animated.Value(0)).current;

    // Function to handle the login process
    const handleLogin = async () => {
        try {
            setAnimating(true);

            // Replace 'https://your-api-url.com/login' with your actual API login endpoint
            const apiUrl = 'https://executive-grapeseed.onrender.com/api/clients';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: clientEmail,
                    password: clientPassword,
                }),
            });

            if (response.ok) {
                const userData = await response.json();

                Animated.timing(rotateValue, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.ease,
                    useNativeDriver: false,
                }).start(() => {
                    setAnimating(false);
                    rotateValue.setValue(0);

                    // Navigate to the 'Dashboard' screen upon successful login
                    Alert.alert('Login successful!', 'Welcome to the Dashboard', [
                        {
                            text: 'OK',
                            onPress: () => {
                                // You can pass user data to the Dashboard screen if needed
                                navigation.navigate('Dashboard', { userData });
                            },
                        },
                    ]);
                });
            } else {
                // If the entered credentials are incorrect, show an error message
                Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
                setAnimating(false);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setAnimating(false);
        }
    };

    // Animated value for rotation animation
    const rotateInterpolation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    // Render the UI components
    return (
        <ImageBackground style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.loginHeading}>Login</Text>

                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(text) => setClientEmail(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(text) => setClientPassword(text)}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isAnimating}>
                    {isAnimating ? (
                        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
                            <Icon name="check" size={30} color="white" />
                        </Animated.View>
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

// Styles for the components
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#daa520',
    },
    loginHeading: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: 'black',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#3498db',
        color: 'black',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        color: 'white',
        paddingLeft: 8,
        borderWidth: 0,
        color: 'black',
    },
    button: {
        backgroundColor: '#000',
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
        height: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

// Export the Login component
export default Login;
