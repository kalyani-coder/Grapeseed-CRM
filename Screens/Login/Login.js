import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Animated, Easing, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();

    const [clientEmail, setclientEmail] = useState('');
    const [clientpassword, setclientpassword] = useState('');
    const [isAnimating, setAnimating] = useState(false);

    const rotateValue = useRef(new Animated.Value(0)).current;

    const handleLogin = async () => {
        try {
            setAnimating(true);


            const response = await fetch('http://localhost:4000/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientEmail,
                    clientpassword,
                }),
            });

            if (response.ok) {
                Animated.timing(rotateValue, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.ease,
                    useNativeDriver: false,
                }).start(() => {
                    setAnimating(false);
                    rotateValue.setValue(0);

                    Alert.alert('Login successful!', 'Welcome to the Dashboard', [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.push('Dashboard');
                            },
                        },
                    ]);
                });
            } else {
                Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
                setAnimating(false);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setAnimating(false);
        }
    };

    const rotateInterpolation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <ImageBackground
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
                        onChangeText={(text) => setclientEmail(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="password"
                        secureTextEntry
                        onChangeText={(text) => setclientpassword(text)}
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
        color: 'black'
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
        color:"black"
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

export default Login;
