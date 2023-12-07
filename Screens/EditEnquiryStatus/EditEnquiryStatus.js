import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const EditEnquiryStatus = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [inquiryData, setInquiryData] = useState({});
    const [editedStatus, setEditedStatus] = useState('');
    const apiUrl = 'YOUR_API_ENDPOINT'; // Replace with your actual API endpoint

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Dummy data for testing
            const dummyData = {
                id: '1', // Replace with the actual ID of the inquiry
                customerName: 'John Doe',
                otherField: 'Lorem Ipsum',
                anotherField: 'Dolor Sit Amet',
                status: 'Approved',
            };

            // Simulate API response delay for better testing experience
            setTimeout(() => {
                setInquiryData(dummyData);
                setEditedStatus(dummyData.status); // Set the initial status to the input field
            }, 1000);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleViewMore = () => {
        setShowDetails(!showDetails);
    };

    const handleUpdateStatus = async () => {
        try {
            // Make an API call to update the status
            const response = await fetch('YOUR_UPDATE_API_ENDPOINT', {
                method: 'PUT', // Use the appropriate HTTP method (PUT, POST, etc.)
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inquiryId: inquiryData.id, // Replace with the actual ID of the inquiry
                    status: editedStatus,
                }),
            });

            if (response.ok) {
                console.log('Status updated successfully.');
                // Optionally, you can update the local state or trigger a refetch of data
                // based on your application's needs.
            } else {
                console.error('Failed to update status.');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Edit Enquiry Status</Text>

            {/* Card 1 */}
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Customer Details</Title>
                    <Paragraph>Customer Name: {inquiryData.customerName}</Paragraph>
                    <Paragraph>Status: {inquiryData.status}</Paragraph>

                    {!showDetails && (
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={handleViewMore}>
                                <Text style={styles.viewMoreButton}>View More</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {showDetails && (
                        <>
                            <Paragraph>Other Field: {inquiryData.otherField}</Paragraph>
                            <Paragraph>Another Field: {inquiryData.anotherField}</Paragraph>
                            <Paragraph>Status: {inquiryData.status}</Paragraph>
                            {/* Display more fields from the API response */}
                        </>
                    )}
                </Card.Content>
            </Card>

            {/* Edit Status Section */}
            {showDetails && (
                <View style={styles.editStatusContainer}>
                    <Text style={styles.editStatusLabel}>Edit Status:</Text>
                    <TextInput
                        style={styles.editStatusInput}
                        value={editedStatus}
                        onChangeText={(text) => setEditedStatus(text)}
                    />
                    <TouchableHighlight
                        style={styles.updateStatusButton}
                        onPress={handleUpdateStatus}
                        underlayColor="black" // Set the color when pressed
                    >
                        <Text style={styles.buttonText}>Update Status</Text>
                    </TouchableHighlight>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#daa520', // Background color in a shade of gray
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        width: '100%',
        marginVertical: 20,
        padding: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    viewMoreButton: {
        color: 'blue',
        textAlign: 'center',
    },
    editStatusContainer: {
        marginTop: 20,
    },
    editStatusLabel: {
        fontSize: 16,
        marginBottom: 10,
    },
    editStatusInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white'
    },
    updateStatusButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default EditEnquiryStatus;
