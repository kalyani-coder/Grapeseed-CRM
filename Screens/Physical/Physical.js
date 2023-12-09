import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const PhysicalInfoPage = ({ navigation }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [physicalInfo, setPhysicalInfo] = useState({
        height: '',
        weight: '',
        physicalChallenges: '',
    });

    const toggleCollapsible = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.formContainer}>



                <TouchableOpacity onPress={toggleCollapsible} style={styles.titleContainer}>
                    <Text style={styles.title}>Physical Information Page</Text>
                </TouchableOpacity>
                <View style={styles.innerFormContainer}>
                    {!isCollapsed && (
                        <View>
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
                                onChangeText={(text) =>
                                    setPhysicalInfo({ ...physicalInfo, physicalChallenges: text })
                                }
                                multiline
                            />

                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = {
    container: {
        flexGrow: 1,
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
        width: '100%', // Set the width to 100%
        marginBottom: 10,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    innerFormContainer: {
        width: '100%', // Set the width for the inner form container to 100%
    },
    title: {
        fontSize: 20,
        color: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#3498db',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        width: '100%', // Keep the width at 100%
        borderRadius: 8,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#000000',
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
};

export default PhysicalInfoPage;
