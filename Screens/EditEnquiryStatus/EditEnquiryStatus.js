import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button, Menu, Divider, Provider } from 'react-native-paper';

const UpdateStatusPage = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);

    useEffect(() => {
        // Dummy data for testing
        const dummyEnquiries = [
            { id: 1, customerName: 'John Doe', status: 'Pending' },
            { id: 2, customerName: 'Jane Doe', status: 'Approved' },
            { id: 3, customerName: 'Bob Smith', status: 'Rejected' },
        ];

        setEnquiries(dummyEnquiries);
    }, []);

    const openMenu = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setVisible(true);
    };

    const closeMenu = () => setVisible(false);

    const updateStatus = (status) => {
        // Implement logic to update the status for the selected enquiry
        console.log(`Updating status to ${status} for enquiry: ${selectedEnquiry.customerName}`);
        // Close the menu after updating the status
        closeMenu();
    };

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{item.customerName}</Title>
                <Paragraph>Enquiry Status: {item.status}</Paragraph>
                <Button onPress={() => openMenu(item)}>View More</Button>
                <Menu
                    visible={visible && selectedEnquiry === item}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={() => openMenu(item)}>Status</Button>}
                >
                    <Menu.Item onPress={() => updateStatus('Pending')} title="Pending" />
                    <Menu.Item onPress={() => updateStatus('Approved')} title="Approved" />
                    <Menu.Item onPress={() => updateStatus('Rejected')} title="Rejected" />
                </Menu>
            </Card.Content>
        </Card>
    );

    return (
        <Provider>
            <FlatList
                data={enquiries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </Provider>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        padding: 10,
    },
});

export default UpdateStatusPage;
