import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const ViewInquiryPage = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [inquiryData, setInquiryData] = useState({});
    const apiUrl = 'YOUR_API_ENDPOINT'; // Replace with your actual API endpoint

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setInquiryData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleViewMore = () => {
        setShowDetails(!showDetails);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Customer Details</Title>
                    <Paragraph>Customer Name: {inquiryData.customerName}</Paragraph>
                    {!showDetails && (
                        <TouchableOpacity onPress={handleViewMore}>
                            <Text style={styles.viewMoreButton}>View More</Text>
                        </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '80%',
        marginVertical: 20,
        padding: 10,
    },
    viewMoreButton: {
        color: 'blue',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default ViewInquiryPage;
