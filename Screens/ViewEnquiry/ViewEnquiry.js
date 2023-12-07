import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const ViewInquiryPage = () => {
    const [expandedCard1, setExpandedCard1] = useState(false);
    const [expandedCard2, setExpandedCard2] = useState(false);
    const [inquiryData, setInquiryData] = useState({});
    const [additionalInquiryData, setAdditionalInquiryData] = useState({});
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

            // Additional dummy data
            const additionalDummyData = {
                customerName: 'Jane Doe',
                otherField: 'Additional Lorem Ipsum',
                anotherField: 'Additional Dolor Sit Amet',
            };

            setInquiryData(dummyData);
            setAdditionalInquiryData(additionalDummyData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleViewMore = (cardNumber) => {
        if (cardNumber === 1) {
            setExpandedCard1(!expandedCard1);
            setExpandedCard2(false); // Collapse other card if expanded
        } else if (cardNumber === 2) {
            setExpandedCard2(!expandedCard2);
            setExpandedCard1(false); // Collapse other card if expanded
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>View Inquiry Page</Text>

            {/* Card 1 */}
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Customer Details</Title>
                    <Paragraph>Customer Name: {inquiryData.customerName}</Paragraph>
                    {!expandedCard1 && (
                        <TouchableOpacity onPress={() => handleViewMore(1)}>
                            <Text style={styles.viewMoreButton}>View More</Text>
                        </TouchableOpacity>
                    )}
                    {expandedCard1 && (
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
                    <Paragraph>Customer Name: {additionalInquiryData.customerName}</Paragraph>
                    {!expandedCard2 && (
                        <TouchableOpacity onPress={() => handleViewMore(2)}>
                            <Text style={styles.viewMoreButton}>View More</Text>
                        </TouchableOpacity>
                    )}
                    {expandedCard2 && (
                        <>
                            <Paragraph>Other Field: {additionalInquiryData.otherField}</Paragraph>
                            <Paragraph>Another Field: {additionalInquiryData.anotherField}</Paragraph>
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
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: '#daa520',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
