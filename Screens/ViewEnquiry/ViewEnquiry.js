import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const ViewInquiryPage = () => {
    const [expandedCards, setExpandedCards] = useState([]);
    const [inquiryData, setInquiryData] = useState([]);
    const apiUrl = 'https://executive-grapeseed.onrender.com/api/enquiry';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setInquiryData(data);
            setExpandedCards(new Array(data.length).fill(false));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleViewMore = (cardNumber) => {
        setExpandedCards((prevExpandedCards) =>
            prevExpandedCards.map((value, index) => (index === cardNumber ? !value : false))
        );
    };

    const renderCardFields = (data) => {
        return (
            <>
                <Paragraph>Pan Card: {data.Pan_Card}</Paragraph>
                <Paragraph>Adhar Card: {data.Adhar_Card}</Paragraph>
                <Paragraph>Cancelled Cheque: {data.Cancelled_cheque}</Paragraph>
                <Paragraph>Name: {data.name}</Paragraph>
                <Paragraph>Mobile Number: {data.mobile_nu}</Paragraph>
                <Paragraph>Alternative Mobile: {data.Alternative_Mobile}</Paragraph>
                <Paragraph>Mother Name: {data.Mother_Name}</Paragraph>
                <Paragraph>Email: {data.Email}</Paragraph>
                <Paragraph>Last Education: {data.Last_Education}</Paragraph>
                <Paragraph>Married Status: {data.Married_Status}</Paragraph>
                <Paragraph>Nominee Name: {data.Nominee_Name}</Paragraph>
                <Paragraph>Nominee DOB: {data.Nominee_DOB}</Paragraph>
                <Paragraph>Nominee Relationship: {data.Nominee_Ralationship}</Paragraph>
                <Paragraph>Company Name: {data.Company_Name}</Paragraph>
                <Paragraph>Annual Income: {data.Annual_Income}</Paragraph>
                <Paragraph>Industry Name: {data.Industry_Name}</Paragraph>
                <Paragraph>Height: {data.Height}</Paragraph>
                <Paragraph>Weight: {data.Weight}</Paragraph>
                <Paragraph>Life Cover: {data.Life_Cover}</Paragraph>
                <Paragraph>Medical History: {data.medical_History}</Paragraph>
                <Paragraph>Employment Status: {data.Employeement_Status}</Paragraph>
                <Paragraph>Filename: {data.filename}</Paragraph>
                <Paragraph>Path: {data.path}</Paragraph>
                <Paragraph>Service Image: {data.serviceImage}</Paragraph>

            </>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>View Inquiry Page</Text>

            {inquiryData.map((data, index) => (
                <Card key={index} style={styles.card}>
                    <Card.Content>
                        <Title>Customer Details</Title>
                        <View style={styles.row}>
                            <Paragraph>Customer Name: {data.name}</Paragraph>
                            <TouchableOpacity onPress={() => handleViewMore(index)}>
                                <Text style={styles.viewMoreButton}>
                                    {expandedCards[index] ? 'View Less' : 'View More'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {expandedCards[index] && renderCardFields(data)}
                    </Card.Content>
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#daa520',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        width: '80%',
        marginVertical: 20,
        padding: 10,
        alignSelf: 'center', // Center the card horizontally
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewMoreButton: {
        color: 'blue',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default ViewInquiryPage;
