import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Animated, Easing } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import NomineeDetailsScreen from './../Nominee/Nominee';

const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSection = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.collapsibleContainer}>
            <TouchableOpacity onPress={toggleSection} style={styles.collapsibleHeader}>
                <Text style={styles.collapsibleHeaderText}>{title}</Text>
            </TouchableOpacity>
            {isOpen && <View style={styles.collapsibleContent}>{children}</View>}
        </View>
    );
};

const PersonalInfoPage = ({ navigation }) => {
    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        mobileNo: '',
        alternateNumber: '',
        motherName: '',
        lastEducation: '',
        mailId: '',
        maritalStatus: '',
        lifeStage: '',
    });

    const lifeStageOptions = ['Single', 'Married', 'Married with Children', 'Close to Retirement'];

    const handleSave = async () => {
        try {
            // Add logic to send the personalInfo data to your API
            // For example, using fetch or axios
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(personalInfo),
            });

            // Handle the API response if needed
            const data = await response.json();
            console.log('API Response:', data);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleNext = () => {
        // Navigate to the next page (replace 'NextPage' with your actual next page)
        navigation.navigate('NomineeDetailsScreen');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
                <CollapsibleSection title="Personal Information Page">
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={personalInfo.name}
                        onChangeText={(text) => setPersonalInfo({ ...personalInfo, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mobile No"
                        value={personalInfo.mobileNo}
                        onChangeText={(text) => setPersonalInfo({ ...personalInfo, mobileNo: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Alternate Number"
                        value={personalInfo.alternateNumber}
                        onChangeText={(text) => setPersonalInfo({ ...personalInfo, alternateNumber: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mother Name"
                        value={personalInfo.motherName}
                        onChangeText={(text) => setPersonalInfo({ ...personalInfo, motherName: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Education"
                        value={personalInfo.lastEducation}
                        onChangeText={(text) => setPersonalInfo({ ...personalInfo, lastEducation: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mail ID"
                        value={personalInfo.mailId}
                        onChangeText={(text) => setPersonalInfo({ ...personalInfo, mailId: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Marital Status"
                        value={personalInfo.maritalStatus}
                        onChangeText={(text) => setPersonalInfo({ ...personalInfo, maritalStatus: text })}
                    />
                    <ModalDropdown
                        options={lifeStageOptions}
                        onSelect={(index, value) => setPersonalInfo({ ...personalInfo, lifeStage: value })}
                        defaultValue="Select Life Stage"
                        style={styles.dropdown}
                        textStyle={{ fontSize: 16 }}
                        dropdownStyle={{ width: '80%', borderRadius: 8 }}
                        dropdownTextStyle={{ fontSize: 16 }}
                        dropdownIconStyle={styles.dropdownIcon}
                    />
                </CollapsibleSection>
            </View>

        </ScrollView>
    );
};

const styles = {
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 16,
        width: '90%',
        backgroundColor: '#daa520',
    },
    formContainer: {
        width: '100%',
        // Set the width for the entire form container
    },
    input: {
        height: 50,
        borderColor: '#3498db',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        width: '100%', // Keep the width at 100%
        borderRadius: 8,
        backgroundColor: 'white',
    },
    dropdown: {
        height: 50,
        borderColor: '#3498db',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        paddingRight: 30,
        width: '100%', // Keep the width at 100%
        borderRadius: 8,
        backgroundColor: 'white',
    },
    dropdownIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: 'black',
    },
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        height: 50,
        alignItems: 'center',
        width: '100%', // Keep the width at 100%
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    collapsibleContainer: {
        marginBottom: 16,
        width: '100%',
    },
    collapsibleHeader: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 8,
        height: 50,
        alignItems: 'center',
        width: '100%',
    },
    collapsibleHeaderText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    collapsibleContent: {
        marginTop: 8,
    },
};

export default PersonalInfoPage;
