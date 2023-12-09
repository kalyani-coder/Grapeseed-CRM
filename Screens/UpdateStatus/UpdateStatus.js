import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const UpdateStatusPage = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [inquiryData, setInquiryData] = useState({});
    const [selectedStatus, setSelectedStatus] = useState(''); // State to store selected status
    const apiUrl = 'https://executive-grapeseed.onrender.com/api/enquiry';

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setInquiryData(data[0]); // Update with the actual structure of your API response
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleViewMore = () => {
        setShowDetails(!showDetails);
    };

    const handleUpdateStatus = async (status) => {
        // Implement your logic for updating the status here
        try {
            const response = await fetch(apiUrl, {
                method: 'PATCH', // Assuming the API supports PATCH method for updating status
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status,
                }),
            });

            if (response.ok) {
                console.log('Status updated successfully');
                // Fetch updated data after status update
                fetchData();
            } else {
                console.log('Error updating status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Enquiry List</Text>

            {/* Card */}
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Customer Details</Title>
                    <Paragraph>Customer Name: {inquiryData.name}</Paragraph>
                    {!showDetails && (
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={handleViewMore}>
                                <Text style={styles.viewMoreButton}>View More</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleUpdateStatus('pending')}>
                                <Text style={styles.updateStatusButton}>Pending</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleUpdateStatus('approved')}>
                                <Text style={styles.updateStatusButton}>Approved</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleUpdateStatus('rejected')}>
                                <Text style={styles.updateStatusButton}>Rejected</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {showDetails && (
                        <>
                            <Paragraph>Pan Card: {inquiryData.Pan_Card}</Paragraph>
                            <Paragraph>Adhar Card: {inquiryData.Adhar_Card}</Paragraph>
                            <Paragraph>Cancelled Cheque: {inquiryData.Cancelled_cheque}</Paragraph>
                            {/* Display more fields from the API response */}
                        </>
                    )}
                </Card.Content>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#daa520',
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
