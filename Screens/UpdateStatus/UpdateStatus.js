import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const UpdateStatusPage = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [inquiryData, setInquiryData] = useState({});
    const apiUrl = 'YOUR_API_ENDPOINT'; // Replace with your actual API endpoint

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Dummy data for testing
            const dummyData = {
                customerName: 'John Doe',
                otherField: 'Lorem Ipsum',
                anotherField: 'Dolor Sit Amet',
            };

            // Simulate API response delay for better testing experience
            setTimeout(() => {
                setInquiryData(dummyData);
            }, 1000);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleViewMore = () => {
        setShowDetails(!showDetails);
    };

    const handleUpdateStatus = () => {
        // Implement your logic for updating the status here
        console.log('Updating status...');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Enquiry List</Text>

            {/* Card 1 */}
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Customer Details</Title>
                    <Paragraph>Customer Name: {inquiryData.customerName}</Paragraph>
                    {!showDetails && (
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={handleViewMore}>
                                <Text style={styles.viewMoreButton}>View More</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleUpdateStatus}>
                                <Text style={styles.updateStatusButton}>Update Status</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {showDetails && (
                        <>
                            <Paragraph>Other Field: {inquiryData.otherField}</Paragraph>
                            <Paragraph>Another Field: {inquiryData.anotherField}</Paragraph>
                            {/* Display more fields from the API response */}
                        </>
                    )}
                </Card.Content>
            </Card>

            {/* Card 2 (Additional Card) */}
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Additional Customer Details</Title>
                    <Paragraph>Customer Name: Jane Doe</Paragraph>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={handleViewMore}>
                            <Text style={styles.viewMoreButton}>View More</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleUpdateStatus}>
                            <Text style={styles.updateStatusButton}>Update Status</Text>
                        </TouchableOpacity>
                    </View>
                </Card.Content>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#daa520',// Background color in a shade of gray
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
    updateStatusButton: {
        color: 'green',
        textAlign: 'center',

    },
});

export default UpdateStatusPage;
