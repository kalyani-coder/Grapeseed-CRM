import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { NativeBaseProvider, Box, HStack, Pressable, Center, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Example() {
  const [selected, setSelected] = React.useState(0);

  const items = [
    { name: 'Home', icon: 'home' },
    { name: 'View Enquiry', icon: 'search' },
    { name: 'Update Status', icon: 'cart' },
    // Add more items as needed
  ];

  return (
    <Box flex={1} bg="white" safeAreaTop width="100%" alignSelf="center">
      <Box flex={1}>
        {/* Your main content goes here */}
      </Box>
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
              icon={<Icon mb="1" as={<MaterialCommunityIcons name="menu" color="white" />} size="sm" />}
              <Text color="white" fontSize="12" style={styles.footerText}>
                {item.name}
              </Text>
            </Center>
          </Pressable>
        ))}
      </HStack>
    </Box>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Example />
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
});
