import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const ViewEnquiryDetails = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [inquiryData, setInquiryData] = useState({});
    const apiUrl = 'YOUR_API_ENDPOINT'; 

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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>View Enquiry Details</Text>

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
        alignItems: 'center', 
    },
    viewMoreButton: {
        color: 'blue',
        textAlign: 'center',
    },
});

export default ViewEnquiryDetails;
