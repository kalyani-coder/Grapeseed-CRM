import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Alert, Image } from 'react-native';
import { NativeBaseProvider, Box, HStack, Pressable, Center, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, Title, Paragraph } from 'react-native-paper';
import CustomerDetailsScreen from './../CustomerDetails/CustomerDetails';
import ViewInquiryPage from './../ViewEnquiry/ViewEnquiry';
import UpdateStatusPage from './../UpdateStatus/UpdateStatus';


function Footer() {
  const [selected, setSelected] = React.useState(0);

  const items = [
    { name: 'Home', icon: 'home' },
    { name: 'Profile', icon: 'person' },
    { name: 'Settings', icon: 'settings' },
    // Add more items as needed
  ];




  return (
    <HStack bg="black" alignItems="center" shadow={6}>
      {items.map((item, index) => (
        <Pressable
          key={index}
          cursor="pointer"
          opacity={selected === index ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(index)}
        >
          <Center>
            <Icon mb="1" as={<MaterialIcons name={item.icon} />} color="white" size="sm" />
            <Text color="white" fontSize="12" style={styles.footerText}>
              {item.name}
            </Text>
          </Center>
        </Pressable>
      ))}
    </HStack>
  );
}

const CustomCard = ({ title, subtitle, content, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>{title}</Title>
          {subtitle && <Paragraph style={styles.cardSubtitle}>{subtitle}</Paragraph>}
          {content && <Paragraph style={styles.cardContent}>{content}</Paragraph>}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default function Home() {
  const handleCardClick1 = (message) => {
    if (message === 'Add Enquiry') {
      // Navigate to the desired screen (replace 'TargetScreen' with your actual screen name)
      navigation.navigate('CustomerDetailsScreen');
    } else {
      Alert.alert(`${message} Clicked!`);
      // Add your desired functionality for other cards here
    }
  };
  const handleCardClick2 = (message) => {
    if (message === 'Edit Enquiry Status') {
      // Navigate to the desired screen (replace 'TargetScreen' with your actual screen name)
      navigation.navigate('ViewInquiryPage');
    } else {
      Alert.alert(`${message} Clicked!`);
      // Add your desired functionality for other cards here
    }
  };
  const handleCardClick3 = (message) => {
    if (message === 'Edit Enquiry Status') {
      // Navigate to the desired screen (replace 'TargetScreen' with your actual screen name)
      navigation.navigate('UpdateStatusPage');
    } else {
      Alert.alert(`${message} Clicked!`);
      // Add your desired functionality for other cards here
    }
  };
  const handleCardClick4 = (message) => {
    if (message === 'Edit Enquiry Status') {
      // Navigate to the desired screen (replace 'TargetScreen' with your actual screen name)
      navigation.navigate('EditInquiryPage');
    } else {
      Alert.alert(`${message} Clicked!`);
      // Add your desired functionality for other cards here
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ ...styles.container, backgroundColor: '#979aaa' }}>
        <Box flex={1} bg="white" safeAreaTop width="100%" alignSelf="center">
          <Box flex={1} justifyContent="flex-end"> {/* Align the box to the bottom */}
            {/* Image Section */}
            <Image
              source={{ uri: 'https://finvestfox.com/wp-content/uploads/2020/09/mutual-fund-768x432.jpg' }}
              style={styles.image}
            />

            {/* Card Section */}
            <View style={styles.row}>
              <CustomCard
                title="Enquiry"
                onPress={() => handleCardClick1('Enquiry')}
              />
              <CustomCard
                title="View Enquiry"
                onPress={() => handleCardClick2('View Enquiry')}
              />
            </View>
            <View style={styles.row}>
              <CustomCard
                title="Update Status"
                onPress={() => handleCardClick3('Update Status')}
              />
              <CustomCard
                title="Edit Enquiry Status"
                onPress={() => handleCardClick4('Edit Enquiry Status')}
              />
            </View>
          </Box>
          {/* Add the Footer component */}
          <Footer />
        </Box>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerText: {
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  card: {
    margin: 15,
    padding: 15,
    borderRadius: 10,
    width: 150, // Use '100%' to take full width
    height: 150, // Fixed height for all cards
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
  },
  cardContent: {
    fontSize: 12,
    color: 'gray',
  },
  image: {
    width: '100%', // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: 'cover', // Adjust the resizeMode as needed
  },
});
