import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Easing } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import * as DocumentPicker from 'expo-document-picker';

const CustomerDetailsScreen = ({ navigation }) => {
    const [Pan_Card, setPan_Card] = useState('');
    const [Adhar_Card, setAdhar_Card] = useState('');
    const [Cancelled_cheque, setCancelled_cheque] = useState('');
    const [employmentStatus, setEmploymentStatus] = useState(null);
    const [incomeDocument, setIncomeDocument] = useState('');
    const [photograph, setPhotograph] = useState('');
    const [animatedValue] = useState(new Animated.Value(0));

    const handleSaveAndNext = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Pan_Card: Pan_Card,
                    Adhar_Card: Adhar_Card,
                    Cancelled_cheque: Cancelled_cheque,
                    employmentStatus: employmentStatus,
                    incomeDocument: incomeDocument,
                    photograph: photograph,
                }),
            });

            if (response.ok) {
                // Handle success, e.g., navigate to the next screen
                navigation.navigate('PersonalInfoPage');
            } else {
                // Handle error response
                const errorData = await response.json();
                console.error('Enquiry API error:', errorData);
                // Display an alert or handle the error in some way
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error posting data to Enquiry API:', error);
            // Display an alert or handle the error in some way
        }
    };

    const handleFilePick = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
            });

            if (result.type === 'success') {
                setPhotograph(result.uri);

                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 20000,
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
                    duration: 20000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                })
            ).start();
        }
    }, [employmentStatus]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customer Details Page</Text>

            <TextInput
                style={styles.input}
                placeholder="Pan Card"
                value={Pan_Card}
                onChangeText={(text) => setPan_Card(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Aadhar Card"
                value={Adhar_Card}
                onChangeText={(text) => setAdhar_Card(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Cancelled Cheque"
                value={Cancelled_cheque}
                onChangeText={(text) => setCancelled_cheque(text)}
            />

            <ModalDropdown
                options={['Self Employed', 'Salaried']}
                onSelect={(index, value) => setEmploymentStatus(value)}
                defaultValue="Select Employment Status"
                style={styles.dropdown}
                textStyle={{ fontSize: 16, color: 'black' }}
                dropdownStyle={{ width: '80%', borderRadius: 8, zIndex: 100 }}
                dropdownTextStyle={{ fontSize: 16 }}
                dropdownIconStyle={styles.dropdownIcon}
            />

            <TouchableOpacity style={styles.button} onPress={handleFilePick}>
                <Animated.Text
                    style={[
                        styles.buttonText,
                        {
                            marginLeft: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '-200%'],
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

            {photograph ? <Text>Selected File: {photograph}</Text> : null}

            <TouchableOpacity style={styles.saveAndNextButton} onPress={handleSaveAndNext}>
                <Text style={styles.buttonText}>Save & Next</Text>
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
        backgroundColor: '#daa520',
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
        backgroundColor: 'white',
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
        backgroundColor: 'white',
        color: 'white',
    },
    dropdownIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        height: 50,
        alignItems: 'center',
        width: '80%',
        overflow: 'hidden',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    saveAndNextButton: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        height: 50,
        alignItems: 'center',
        width: '80%',
        overflow: 'hidden',
    },
};

export default CustomerDetailsScreen;
