import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

const PhysicalInfoPage = ({ navigation }) => {
    const [physicalInfo, setPhysicalInfo] = useState({
        height: '',
        weight: '',
        physicalChallenges: '',
    });

    const handleSaveAndNext = async () => {
        try {
            // Add logic to send the physicalInfo data to your API
            // For example, using fetch or axios
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(physicalInfo),
            });

            // Handle the API response if needed
            const data = await response.json();
            console.log('API Response:', data);
        } catch (error) {
            console.error('Error saving data:', error);
        }

        // Navigate to the next page (replace 'NextPage' with your actual next page)
        navigation.navigate('NextPage');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Physical Information Page</Text>

            <TextInput
                style={styles.input}
                placeholder="Height"
                value={physicalInfo.height}
                onChangeText={(text) => setPhysicalInfo({ ...physicalInfo, height: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Weight"
                value={physicalInfo.weight}
                onChangeText={(text) => setPhysicalInfo({ ...physicalInfo, weight: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Physical Challenges (Diabetes, BP, Medical History)"
                value={physicalInfo.physicalChallenges}
                onChangeText={(text) => setPhysicalInfo({ ...physicalInfo, physicalChallenges: text })}
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleSaveAndNext}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = {
    container: {
        flexGrow: 1,
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
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#000000',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        height: 50,
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
};

export default PhysicalInfoPage;
