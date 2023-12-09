import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Alert, Image } from 'react-native';
import { NativeBaseProvider, Box, HStack, Pressable, Center, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../Navbar/Navbar';
// import CustomerDetailsScreen from '../CustomerDetails/CustomerDetailsScreen';


function Footer() {
  const [selected, setSelected] = React.useState(0);
  // Get the navigation prop



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

export default function Dashboard() {
  const navigation = useNavigation();
  console.log('Navigation Object:', navigation);
  const handleCardClick1 = (message) => {
    if (message === 'Enquiry') {
      navigation.navigate('CustomerDetailsScreen');

    } else {
      Alert.alert(`${message} Clicked!`);

      // Add your desired functionality for other cards here
    }
  };




  const handleCardClick2 = (message) => {
    if (message === 'View Enquiry') {
      navigation.push('ViewInquiryPage');
    } else {
      Alert.alert(`${message} Clicked!`);
      // Add your desired functionality for other cards here
    }
  };




  const handleCardClick3 = (message) => {
    if (message === 'Update Status') {
      navigation.push('UpdateStatusPage');
    } else {
      Alert.alert(`${message} Clicked!`);
      // Add your desired functionality for other cards here
    }
  };




  const handleCardClick4 = (message) => {
    if (message === 'Edit Enquiry Status') {
      navigation.push('EditInquiryStatus');
    } else {
      Alert.alert(`${message} Clicked!`);
      // Add your desired functionality for other cards here
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ ...styles.container }}>
        <View><Navbar /></View>
        <Box flex={1} bg="#daa520" safeAreaTop width="100%" alignSelf="center">
          <Box flex={1} justifyContent="flex-end">
            {/* Image Section */}
            <Image
              source={{ uri: 'https://finvestfox.com/wp-content/uploads/2020/09/mutual-fund-768x432.jpg' }}
              alt='img'
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
    backgroundColor: '#daa520',

  },
  footerText: {
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
    // backgroundColor: '#daa520',

  },
  card: {
    margin: 15,
    padding: 15,
    borderRadius: 10,
    width: 180,
    height: 150,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardSubtitle: {
    fontSize: 14,
  },
  cardContent: {
    fontSize: 12,
    // color: 'gray',
    backgroundColor: '#daa520'
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',

  },
});
