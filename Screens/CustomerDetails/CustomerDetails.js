import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Easing } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import * as DocumentPicker from 'expo-document-picker';
import PersonalInfoPage from './../PersonalInfoPage/PersonalInfoPage';

const CustomerDetailsScreen = ({ navigation }) => {
    const [panCard, setPanCard] = useState('');
    const [aadharCard, setAadharCard] = useState('');
    const [cancelledCheque, setCancelledCheque] = useState('');
    const [employmentStatus, setEmploymentStatus] = useState(null);
    const [incomeDocument, setIncomeDocument] = useState('');
    const [photograph, setPhotograph] = useState('');
    const [animatedValue] = useState(new Animated.Value(0));

    const handleFilePick = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
            });

            if (result.type === 'success') {
                setPhotograph(result.uri);

                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 20000, // Slowed down the animation further
                    easing: Easing.linear,
                    useNativeDriver: false,
                }).start(() => {
                    animatedValue.setValue(0);
                });
            }
        } catch (err) {
            console.error('Error picking a file', err);
        }
    };

    useEffect(() => {
        if (employmentStatus) {
            Animated.loop(
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 20000, // Slowed down the animation further
                    easing: Easing.linear,
                    useNativeDriver: false,
                })
            ).start();
        }
    }, [employmentStatus]);

    const handleNext = () => {
        navigation.navigate('PersonalInfoPage');
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customer Details Page</Text>

            <TextInput
                style={styles.input}
                placeholder="Pan Card"
                value={panCard}
                onChangeText={(text) => setPanCard(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Aadhar Card"
                value={aadharCard}
                onChangeText={(text) => setAadharCard(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Cancelled Cheque"
                value={cancelledCheque}
                onChangeText={(text) => setCancelledCheque(text)}
            />

            {/* Employment status dropdown */}
            <ModalDropdown
                options={['Self Employed', 'Salaried']}
                onSelect={(index, value) => setEmploymentStatus(value)}
                defaultValue="Select Employment Status"
                style={styles.dropdown}
                textStyle={{ fontSize: 16 }}
                dropdownStyle={{ width: '80%', borderRadius: 8 }}
                dropdownTextStyle={{ fontSize: 16 }}
                dropdownIconStyle={styles.dropdownIcon}
            />

            {/* Conditional document upload fields */}

            {/* File upload button */}
            <TouchableOpacity style={styles.button} onPress={handleFilePick}>
                <Animated.Text
                    style={[
                        styles.buttonText,
                        {
                            marginLeft: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '-200%'], // Adjust the initial position based on your preference
                            }),
                        },
                    ]}
                >
                    {employmentStatus === 'Self Employed'
                        ? 'Upload Last 2 years ITR with Computation of Income'
                        : employmentStatus === 'Salaried'
                            ? 'Upload Last 3 Months Salary'
                            : 'Upload Photograph'}
                </Animated.Text>
            </TouchableOpacity>

            {/* Display the selected file name or path */}
            {photograph ? <Text>Selected File: {photograph}</Text> : null}

            {/* Submit button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>save </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#3498db',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        width: '80%',
        borderRadius: 8,
    },
    dropdown: {
        height: 40,
        borderColor: '#3498db',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        paddingRight: 30,
        width: '80%',
        borderRadius: 8,
    },
    dropdownIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        height: 40,
        alignItems: 'center',
        width: '80%', // Set a default width for the button
        overflow: 'hidden', // Ensure the text stays in one line
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
};

export default CustomerDetailsScreen;
