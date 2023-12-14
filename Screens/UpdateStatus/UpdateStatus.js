import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Linking,
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import {
    NativeBaseProvider,
    VStack,
    HStack,
    Pressable,
    Center,
    Icon,
    ScrollView,
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
    ];

    const handlePress = (index) => {
        setSelected(index);

        if (index === 0) {
            navigation.navigate('Dashboard');
        } else if (index === 1) {
            navigation.navigate('ProfilePage');
        } else if (index === 2) {
            Linking.openSettings();
        }
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
                        <Icon
                            mb="1"
                            as={<MaterialIcons name={item.icon} />}
                            size="sm"
                        />
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
    const [enquiries, setEnquiries] = useState([]);
    const [status, setStatus] = useState('');
    const [enquiryId, setEnquiryId] = useState('');
    const [showDetailsMap, setShowDetailsMap] = useState({});
    const apiUrl = 'https://executive-grapeseed.onrender.com/api/enquiry';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.length > 0) {
                setEnquiries(data);
                const id = data[0]._id;
                setEnquiryId(id);
                setStatus(data[0].status || '');
                // Initialize showDetailsMap with default values (false) for each inquiry
                const initialShowDetailsMap = data.reduce((acc, inquiry) => {
                    acc[inquiry._id] = false;
                    return acc;
                }, {});
                setShowDetailsMap(initialShowDetailsMap);
            } else {
                console.log('No data found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleViewMore = (inquiryId) => {
        setShowDetailsMap((prev) => ({ ...prev, [inquiryId]: true }));
    };

    const handleViewLess = (inquiryId) => {
        setShowDetailsMap((prev) => ({ ...prev, [inquiryId]: false }));
    };

    const handleEditStatus = async () => {
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
            <VStack flex={1}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>Enquiry List</Text>

                    {enquiries.map((inquiryData) => (
                        <Card key={inquiryData._id} style={styles.card}>
                            <Card.Content>
                                <Title>Customer Details</Title>
                                <Paragraph>Customer Name: {inquiryData.name}</Paragraph>
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity onPress={() => handleViewMore(inquiryData._id)}>
                                        <Text style={styles.viewMoreButton}>
                                            View More
                                        </Text>
                                    </TouchableOpacity>
                                    <ModalDropdown
                                        options={statusOptions}
                                        onSelect={(index, value) => setStatus(value)}
                                        style={styles.dropdownButton}
                                    >
                                        <Text style={styles.editStatusButton}>Update Status</Text>
                                    </ModalDropdown>
                                </View>
                                {showDetailsMap[inquiryData._id] && (
                                    <>
                                        <Paragraph>Pan Card: {inquiryData.Pan_Card}</Paragraph>
                                        <Paragraph>Adhar Card: {inquiryData.Adhar_Card}</Paragraph>
                                        <Paragraph>Cancelled Cheque: {inquiryData.Cancelled_cheque}</Paragraph>
                                        <Paragraph>Name: {inquiryData.name}</Paragraph>
                                        <Paragraph>Mobile Number: {inquiryData.mobile_nu}</Paragraph>
                                        <Paragraph>Alternative Mobile: {inquiryData.Alternative_Mobile}</Paragraph>
                                        <Paragraph>Mother Name: {inquiryData.Mother_Name}</Paragraph>
                                        <Paragraph>Email: {inquiryData.Email}</Paragraph>
                                        <Paragraph>Last Education: {inquiryData.Last_Education}</Paragraph>
                                        <Paragraph>Married Status: {inquiryData.Married_Status}</Paragraph>
                                        <Paragraph>Nominee Name: {inquiryData.Nominee_Name}</Paragraph>
                                        <Paragraph>Nominee DOB: {inquiryData.Nominee_DOB}</Paragraph>
                                        <Paragraph>Nominee Relationship: {inquiryData.Nominee_Ralationship}</Paragraph>
                                        <Paragraph>Company Name: {inquiryData.Company_Name}</Paragraph>
                                        <Paragraph>Annual Income: {inquiryData.Annual_Income}</Paragraph>
                                        <Paragraph>Industry Name: {inquiryData.Industry_Name}</Paragraph>
                                        <Paragraph>Height: {inquiryData.Height}</Paragraph>
                                        <Paragraph>Weight: {inquiryData.Weight}</Paragraph>
                                        <Paragraph>Life Cover: {inquiryData.Life_Cover}</Paragraph>
                                        <Paragraph>Medical History: {inquiryData.medical_History}</Paragraph>
                                        <Paragraph>Employment Status: {inquiryData.Employeement_Status}</Paragraph>
                                        {/* <Paragraph>Filename: {inquiryData.filename}</Paragraph>
                                        <Paragraph>Path: {inquiryData.path}</Paragraph>
                                        <Paragraph>Service Image: {inquiryData.serviceImage}</Paragraph> */}
                                        <Text>Status: {status}</Text>
                                        <TouchableOpacity onPress={() => handleViewLess(inquiryData._id)}>
                                            <Text style={styles.viewMoreButton}>
                                                View Less
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </Card.Content>
                        </Card>
                    ))}
                </ScrollView>
                <Footer />
            </VStack>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#daa520',
        padding: 20,
    },
    footerText: {
        color: 'white',
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
        color: 'white',
        textAlign: 'center',
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'black',
    },
    dropdownButton: {
        backgroundColor: '#daa520',
        padding: 10,
        borderRadius: 5,
    },
    editStatusButton: {
        textAlign: 'center',
        color: 'white',
    },
});

export default EditEnquiryPage;
