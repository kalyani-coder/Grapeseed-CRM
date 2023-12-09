import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const NomineeDetailsScreen = ({ navigation }) => {
    const [nomineeName, setNomineeName] = useState('');
    const [nomineeDOB, setNomineeDOB] = useState('');
    const [nomineeRelationship, setNomineeRelationship] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapsible = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleSubmit = () => {
        // Handle form submission logic
        navigation.navigate('PhysicalInfoPage');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleCollapsible} style={styles.titleContainer}>
                <Text style={styles.title}>Nominee Details Page</Text>
            </TouchableOpacity>

            {!isCollapsed && (
                <View style={styles.contentContainer}>
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


                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#daa520',

        width: '90%',
    },
    titleContainer: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 8,
        height: 50,
        alignItems: 'center',
        width: '100%',
        marginBottom: 10, // Add margin bottom to the title container
    },
    title: {
        fontSize: 20,
        color: '#fff',
    },
    contentContainer: {
        width: '100%', // Set the content container width to 100%
        alignItems: 'center', // Center the content horizontally
    },
    input: {
        height: 40,
        borderColor: '#3498db',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        width: '100%', // Set the width to 90%
        borderRadius: 8,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        height: 50,
        alignItems: 'center',
        width: '100%', // Set the width to 90%
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default NomineeDetailsScreen;
