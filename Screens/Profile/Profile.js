import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
        fullName: '',
        contactNumber: '',
        address: '',
        panCard: '',
        email: '',
    });

    useEffect(() => {
        // Fetch profile data from your API endpoint
        const apiUrl = 'YOUR_API_ENDPOINT';

        // Dummy data for testing
        const dummyData = {
            fullName: 'John Doe',
            contactNumber: '123-456-7890',
            address: '123 Main St, Cityville',
            panCard: 'ABCDE1234F',
            email: 'john.doe@example.com',
        };

        // Set the dummy data to the state
        setProfileData(dummyData);

        // If you want to fetch real data, uncomment the following lines and replace with your fetch logic
        // fetch(apiUrl)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setProfileData(data);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching profile data:', error);
        //     });
    }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/gapeseed-logo.png')} style={styles.logo} />
                </View>

                <Text style={styles.title}>Profile Page</Text>

                {/* Display Profile Data */}
                <View style={styles.profileDataContainer}>
                    <View style={styles.profileRow}>
                        <FontAwesome name="user" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.profileText}>Full Name: {profileData.fullName}</Text>
                    </View>
                    <View style={styles.profileRow}>
                        <FontAwesome name="phone" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.profileText}>Contact Number: {profileData.contactNumber}</Text>
                    </View>
                    <View style={styles.profileRow}>
                        <FontAwesome name="home" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.profileText}>Address: {profileData.address}</Text>
                    </View>
                    <View style={styles.profileRow}>
                        <FontAwesome name="id-card" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.profileText}>Pan Card: {profileData.panCard}</Text>
                    </View>
                    <View style={styles.profileRow}>
                        <FontAwesome name="envelope" size={24} color="#fff" style={styles.icon} />
                        <Text style={styles.profileText}>Email: {profileData.email}</Text>
                    </View>
                </View>
            </View>
            <Footer />
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db', // Change the background color as needed
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        color: 'white'
    },
    logoContainer: {
        width: '80%', // Adjust the width as needed
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: '100%',
        height: 180,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff', // Text color
    },
    profileDataContainer: {
        width: '100%',
        alignItems: 'flex-start',
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    profileText: {
        fontSize: 20,
        color: '#fff', // Text color
    },
});

export default ProfilePage;
