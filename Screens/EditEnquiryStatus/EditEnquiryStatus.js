import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';

import {
    NativeBaseProvider,
    HStack,
    Pressable,
    Center,
    Icon,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Footer() {
    const [selected, setSelected] = React.useState(0);
    const navigation = useNavigation();

    const items = [
        { name: 'Home', icon: 'home' },
        { name: 'Profile', icon: 'person' },
        { name: 'Settings', icon: 'settings' },
        // Add more items as needed
    ];

    const handlePress = (index) => {
        setSelected(index);

        // Navigate to the corresponding screen
        if (index === 0) {
            navigation.navigate('Dashboard');
        } else if (index === 1) {
            navigation.navigate('ProfilePage');
        }
        else if (index === 2) {
            // Open phone settings
            Linking.openSettings();
        }
        // Add more navigation logic for other buttons if needed
    };

    return (
        <HStack bg="black" alignItems="center" shadow={6}>
            {items.map((item, index) => (
                <Pressable
                    key={index}
                    cursor="pointer"
                    opacity={selected === index ? 1 : 0.5}
                    py="2"
                    flex={1}
                    onPress={() => handlePress(index)}
                >
                    <Center>
                        <Icon mb="1" as={<MaterialIcons name={item.icon} />} size="sm" />
                        <Text color="white" fontSize="12" style={styles.footerText}>
                            {item.name}
                        </Text>
                    </Center>
                </Pressable>
            ))}
        </HStack>
    );
}

const EditEnquiryStatus = () => {
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

    const handleUpdateStatus = async (id, status) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: status,
                }),
            });

            if (response.ok) {
                console.log('Status updated successfully');
                // Update the status in the local inquiry data
                const updatedInquiryData = inquiryData.map((item) =>
                    item._id === id ? { ...item, status } : item
                );
                setInquiryData(updatedInquiryData);
            } else {
                console.log('Error updating status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const renderCardFields = (data, index) => {
        const dropdownOptions = ['Pending', 'Approve', 'Reject'];

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

                <View style={styles.dropdownContainer}>
                    <ModalDropdown
                        options={dropdownOptions}
                        onSelect={(dropdownIndex, value) => handleUpdateStatus(data._id, value)}
                        textStyle={styles.dropdownText}
                        dropdownStyle={styles.dropdownStyle}
                        dropdownTextStyle={styles.dropdownTextStyle}
                        dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                    >
                        <Text style={styles.dropdownButton}>Edit</Text>
                    </ModalDropdown>
                </View>
                <Paragraph>Updated Status: {data.status}</Paragraph>
            </>
        );
    };

    return (
        <NativeBaseProvider>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Edit Enquiry Status</Text>

                {inquiryData.length > 0 ? (
                    inquiryData.map((data, index) => (
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
                                {expandedCards[index] && renderCardFields(data, index)}
                            </Card.Content>
                        </Card>
                    ))
                ) : (
                    <Text>No inquiry data available</Text>
                )}
            </ScrollView>
            <Footer />
        </NativeBaseProvider>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewMoreButton: {
        color: 'blue',
        textAlign: 'center',
    },
    dropdownContainer: {
        marginTop: 10,
    },
    dropdownButton: {
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
    },
    dropdownText: {
        fontSize: 15,
        color: 'blue',
        marginRight: 10,
    },
    dropdownStyle: {
        width: 120,
        borderRadius: 8,
    },
    dropdownTextStyle: {
        fontSize: 15,
        textAlign: 'center',
    },
    dropdownTextHighlightStyle: {
        backgroundColor: '#fff',
    },
    footerText: {
        color: 'white',
    },
});

export default EditEnquiryStatus;
