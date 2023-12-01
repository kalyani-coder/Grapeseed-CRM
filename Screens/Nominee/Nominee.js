// NomineeDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import PhysicalInfoPage from './../Physical/Physical';

const NomineeDetailsScreen = ({ navigation }) => {
    const [nomineeName, setNomineeName] = useState('');
    const [nomineeDOB, setNomineeDOB] = useState('');
    const [nomineeRelationship, setNomineeRelationship] = useState('');

    const handleSubmit = () => {
        // Handle form submission logic
        navigation.navigate('PhysicalInfoPage');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nominee Details Page</Text>

            {/* Form fields */}
            <TextInput
                style={styles.input}
                placeholder="Nominee Name"
                value={nomineeName}
                onChangeText={(text) => setNomineeName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nominee DOB"
                value={nomineeDOB}
                onChangeText={(text) => setNomineeDOB(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nominee Relationship"
                value={nomineeRelationship}
                onChangeText={(text) => setNomineeRelationship(text)}
            />

            {/* Submit button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    button: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default NomineeDetailsScreen;
