// Navbar.js
import React from 'react';
import { Image, HStack, IconButton, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const Navbar = () => {
    return (
        <HStack
            bg="white"
            px="15"
            py="3"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            h='50'
        >
            <HStack spaceBetween alignItems="center">
                <Image
                    source={require('../../assets/logo1.jpeg').default}

                    style={{ width: 30, height: 30, resizeMode: 'contain' }}
                />
            </HStack>
            <IconButton
                icon={<Icon size="sm" as={MaterialIcons} name="menu" color="black" />}
            />
        </HStack>
    );
};

export default Navbar;
