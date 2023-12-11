import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import { NativeBaseProvider, Box, HStack, Pressable, Center, Icon } from 'native-base';
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
        if (index === 0) { // Check if the user clicked on the "Home" button
            navigation.navigate('Dashboard'); // Navigate to the "Dashboard" screen
        } else if (index === 1) {
            navigation.navigate('ProfilePage'); // Navigate to the "ProfilePage" screen
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

const EditEnquiryPage = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [inquiryData, setInquiryData] = useState({});
    const [status, setStatus] = useState('');
    const [enquiryId, setEnquiryId] = useState(''); // State to store enquiry ID
    const apiUrl = 'https://executive-grapeseed.onrender.com/api/enquiry';

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.length > 0) {

                const id = data[0]._id;

                setInquiryData(data[0]); // Update with the actual structure of your API response
                setEnquiryId(id);
            } else {
                console.log('No data found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleViewMore = () => {
        setShowDetails(!showDetails);
    };

    const handleEditStatus = async () => {
        // Implement your logic for editing the status here
        if (status && enquiryId) {
            try {
                const response = await fetch(`${apiUrl}/${enquiryId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        status,
                    }),
                });

                if (response.ok) {
                    console.log('Status edited successfully');
                    // Fetch updated data after status edit
                    fetchData();
                } else {
                    console.log('Error editing status');
                }
            } catch (error) {
                console.error('Error editing status:', error);
            }
        } else {
            console.log('Please select a status');
        }
    };

    const statusOptions = ['Pending', 'Approved', 'Rejected'];

    return (
        <NativeBaseProvider>
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
                                <ModalDropdown
                                    options={statusOptions}
                                    onSelect={(index, value) => setStatus(value)}
                                    style={styles.dropdownButton}
                                >
                                    <Text style={styles.editStatusButton}>Edit Status</Text>
                                </ModalDropdown>
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
    footerText: {
        color: 'white'
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
    dropdownButton: {
        backgroundColor: '#daa520',
        padding: 10,
        borderRadius: 5,
    },
    editStatusButton: {
        color: 'orange',
        textAlign: 'center',
    },
});

export default EditEnquiryPage;
