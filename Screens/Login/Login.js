import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAnimating, setAnimating] = useState(false);

    const rotateValue = useRef(new Animated.Value(0)).current;

    const handleLogin = () => {
        setAnimating(true);
        Animated.timing(rotateValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: false, // Ensure useNativeDriver is set to false for rotation
        }).start(() => {
            // Reset animation and perform other actions after login
            setAnimating(false);
            rotateValue.setValue(0);
            alert('Login successful!');
            // You can navigate to another screen or perform other actions here
        });
    };

    const rotateInterpolation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <ImageBackground
            source={{ uri: 'https://example.com/your-background-image.jpg' }}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.loginHeading}>Login</Text>

                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
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
    },
    loginHeading: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: 'black', // Set text color to white for better visibility
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#3498db', // Change the border color to match the style of CustomerDetailsScreen
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        color: 'white',
        paddingLeft: 8,
        borderWidth: 0, // Remove the inner border
    },
    button: {
        backgroundColor: '#000', // Match the color to the style of CustomerDetailsScreen
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Login;
